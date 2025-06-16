using KafkaFlow;
using Shopnetic.Shared.Database;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.DomainEvents.Inventory;
using Shopnetic.Shared.DomainEvents.Order;
using Shopnetic.Shared.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration.GetSection("KafkaOptions").Get<KafkaOptions>();
if (config is default(KafkaOptions) ||
    config.KafkaBroker1 is default(string) ||
    config.KafkaBroker2 is default(string) ||
    config.KafkaBroker3 is default(string))
    throw new ApplicationException("KafkaOptions are not configured properly.");

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
            .Topic(TopicNames.InventoryInput)
            .WithGroupId("inventory-group")
            .WithWorkersCount(1)
            .WithBufferSize(100)
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddShopneticConsumerMiddleware();
                middlewares.AddTypedHandlers(handlers =>
                {
                    handlers.WithHandlerLifetime(InstanceLifetime.Transient)
                        .AddHandler<InventoryReleasedHandler>()
                        .AddHandler<InventoryConsumedHandler>();
                });
            });

            consumer
            .Topic(TopicNames.Order)
            .WithGroupId("inventory-group")
            .WithWorkersCount(1)
            .WithBufferSize(100)
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddShopneticConsumerMiddleware();
                middlewares.AddTypedHandlers(handlers =>
                {
                    handlers.WithHandlerLifetime(InstanceLifetime.Transient)
                        .AddHandler<OrderCreatedHandler>();
                });
            });
        })
        .AddShopneticProducer(ProducerNames.InventoryOutput, TopicNames.InventoryOutput);
    });
});

var app = builder.Build();
var bus = app.Services.CreateKafkaBus();
await bus.StartAsync();
app.Run();
await bus.StopAsync();

internal class OrderCreatedHandler : IMessageHandler<IntegrationEvent<OrderCreated>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<OrderCreated> message)
    {
        throw new NotImplementedException();
    }
}

internal class InventoryReleasedHandler : IMessageHandler<IntegrationEvent<InventoryReleased>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<InventoryReleased> message)
    {
        throw new NotImplementedException();
    }
}

internal class InventoryConsumedHandler : IMessageHandler<IntegrationEvent<InventoryConsumed>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<InventoryConsumed> message)
    {
        throw new NotImplementedException();
    }
}