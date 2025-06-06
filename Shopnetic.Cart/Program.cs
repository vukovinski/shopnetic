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
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddDecompressor<GzipMessageDecompressor>();
                middlewares.AddDeserializer<ProtobufNetDeserializer>();
                middlewares.AddTypedHandlers(handlers =>
                {
                    handlers.WithHandlerLifetime(InstanceLifetime.Transient)
                        .AddHandler<AddToCartHandler>()
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

internal class AddToCartHandler : IMessageHandler<CartItemAdded>
{
    private readonly ShopneticDbContext _dbContext;

    public AddToCartHandler(ShopneticDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public Task Handle(IMessageContext context, CartItemAdded message)
    {
        // Handle the cart item addition logic here
        return Task.CompletedTask;
    }
}

internal class RemoveFromCartHandler : IMessageHandler<CartItemRemoved>
{
    private readonly ShopneticDbContext _dbContext;

    public RemoveFromCartHandler(ShopneticDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public Task Handle(IMessageContext context, CartItemRemoved message)
    {
        // Handle the cart item removal logic here
        return Task.CompletedTask;
    }
}

internal class UpdateCartItemQuantityHandler : IMessageHandler<CartItemUpdated>
{
    private readonly ShopneticDbContext _dbContext;

    public UpdateCartItemQuantityHandler(ShopneticDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public Task Handle(IMessageContext context, CartItemUpdated message)
    {
        // Handle the cart item update logic here
        return Task.CompletedTask;
    }
}
