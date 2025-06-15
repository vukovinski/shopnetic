using KafkaFlow;
using KafkaFlow.Serializer;
using KafkaFlow.Compressor.Gzip;

using Shopnetic.Shared;
using Shopnetic.Shared.Database;
using Shopnetic.Shared.DomainEvents.Cart;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddKafka(kafka =>
{
    kafka.UseMicrosoftLog();
    var config = builder.Configuration.GetSection("KafkaOptions").Get<KafkaOptions>();
    if (config is null ||
        string.IsNullOrWhiteSpace(config.KafkaBroker1) ||
        string.IsNullOrWhiteSpace(config.KafkaBroker2) ||
        string.IsNullOrWhiteSpace(config.KafkaBroker3))
        throw new ApplicationException("KafkaOptions are not configured properly.");

    kafka.AddCluster(cluster =>
    {
        cluster
        .WithBrokers([config.KafkaBroker1, config.KafkaBroker2, config.KafkaBroker3])
        .AddConsumer(consumer =>
        {
            consumer
            .Topic("cart-events")
            .WithGroupId("cart-group")
            .WithName("cart-consumer")
            .WithWorkersCount(1)
            .WithBufferSize(100)
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddDecompressor<GzipMessageDecompressor>();
                middlewares.AddDeserializer<ProtobufNetDeserializer>();
                middlewares.AddTypedHandlers(handlers =>
                {
                    handlers.WithHandlerLifetime(InstanceLifetime.Transient)
                        .AddHandler<AddToCartHandler>()
                        .AddHandler<CartCreatedHandler>()
                        .AddHandler<RemoveFromCartHandler>()
                        .AddHandler<UpdateCartItemQuantityHandler>();
                });
            });
        });
    });
});

var app = builder.Build();
var bus = app.Services.CreateKafkaBus();
await bus.StartAsync();
app.Run();
await bus.StopAsync();

internal class CartCreatedHandler : IMessageHandler<CartCreated>
{
    public Task Handle(IMessageContext context, CartCreated message)
    {
        return Task.CompletedTask;
    }
}

internal class AddToCartHandler(ShopneticDbContext dbContext) : IMessageHandler<CartItemAdded>
{
    private readonly ShopneticDbContext _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

    public async Task Handle(IMessageContext context, CartItemAdded message)
    {
        var cart = _dbContext.Carts.Find(message.CartId);
        var cartContents = cart?.Deserialize();
        if (cart is { } && cartContents is { })
        {
            cartContents.Items.Add(new CartItem() { ProductId = message.ProductId, Quantity = message.Quantity });
            cart.CartContentsJson = cartContents.Serialize();
            _dbContext.Carts.Update(cart);
            await _dbContext.SaveChangesAsync();
        }
    }
}

internal class RemoveFromCartHandler(ShopneticDbContext dbContext) : IMessageHandler<CartItemRemoved>
{
    private readonly ShopneticDbContext _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

    public async Task Handle(IMessageContext context, CartItemRemoved message)
    {
        var cart = _dbContext.Carts.Find(message.CartId);
        var cartContents = cart?.Deserialize();
        if (cart is { } && cartContents is { })
        {
            var item = cartContents.Items.FirstOrDefault(i => i.ProductId == message.ProductId);
            if (item is { })
            {
                item.Quantity -= message.Quantity;
                if (item.Quantity == 0)
                    cartContents.Items.Remove(item);

                cart.CartContentsJson = cartContents.Serialize();
                _dbContext.Carts.Update(cart);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}

internal class UpdateCartItemQuantityHandler(ShopneticDbContext dbContext) : IMessageHandler<CartItemUpdated>
{
    private readonly ShopneticDbContext _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

    public async Task Handle(IMessageContext context, CartItemUpdated message)
    {
        var cart = _dbContext.Carts.Find(message.CartId);
        var cartContents = cart?.Deserialize();
        if (cart is { } && cartContents is { })
        {
            var item = cartContents.Items.FirstOrDefault(i => i.ProductId == message.ProductId);
            if (item is { })
            {
                item.Quantity = message.Quantity;

                cart.CartContentsJson = cartContents.Serialize();
                _dbContext.Carts.Update(cart);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
