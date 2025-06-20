using KafkaFlow;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.DomainEvents.Cart;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration.GetSection("KafkaOptions").Get<KafkaOptions>()!;
KafkaOptions.Validate(config);

builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddKafka(kafka =>
{
    kafka.UseMicrosoftLog();
    kafka.AddCluster(cluster =>
    {
        cluster
        .WithBrokers([config.KafkaBroker1, config.KafkaBroker2, config.KafkaBroker3])
        .AddConsumer(consumer =>
        {
            consumer
            .Topic(TopicNames.Cart)
            .WithGroupId("cart-group")
            .WithWorkersCount(1)
            .WithBufferSize(100)
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddShopneticConsumerMiddleware();
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

internal class CartCreatedHandler : IMessageHandler<IntegrationEvent<CartCreated>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<CartCreated> message)
    {
        return Task.CompletedTask;
    }
}

internal class AddToCartHandler : IMessageHandler<IntegrationEvent<CartItemAdded>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<CartItemAdded> message)
    {
        // Handle the cart item addition logic here
        return Task.CompletedTask;
    }
}

internal class RemoveFromCartHandler : IMessageHandler<IntegrationEvent<CartItemRemoved>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<CartItemRemoved> message)
    {
        // Handle the cart item removal logic here
        return Task.CompletedTask;
    }
}

internal class UpdateCartItemQuantityHandler : IMessageHandler<IntegrationEvent<CartItemUpdated>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<CartItemUpdated> message)
    {
        // Handle the cart item update logic here
        return Task.CompletedTask;
    }
}
