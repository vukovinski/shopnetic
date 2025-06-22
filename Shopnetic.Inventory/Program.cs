using KafkaFlow;
using KafkaFlow.Producers;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.DomainEvents.Order;
using Shopnetic.Shared.DomainEvents.Inventory;

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
            .Topic(TopicNames.Inventory)
            .WithGroupId("inventory-group")
            .WithWorkersCount(1)
            .WithBufferSize(100)
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddShopneticConsumerMiddleware();
                middlewares.AddTypedHandlers(handlers =>
                {
                    handlers.WithHandlerLifetime(InstanceLifetime.Transient)
                        .AddHandler<InventoryAdjustedHandler>()
                        .AddHandler<InventoryReleasedHandler>()
                        .AddHandler<InventoryConsumedHandler>();
                });
            });
        })
        .AddConsumer(consumer =>
        {
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
                        .AddHandler<OrderVerifedHandler>();
                });
            });
        })
        .AddShopneticProducer(ProducerNames.InventoryToInventoryLoopback, TopicNames.Inventory);
    });
});

await builder.RunShopneticMicroserviceAsync();

internal class OrderVerifedHandler : IMessageHandler<IntegrationEvent<OrderVerified>>
{
    private readonly IMessageProducer _producer;
    private readonly ShopneticDbContext _dbContext;

    public OrderVerifedHandler(IProducerAccessor producers, ShopneticDbContext dbContext)
    {
        _dbContext = dbContext;
        _producer = producers[ProducerNames.InventoryToInventoryLoopback];
    }

    public Task Handle(IMessageContext context, IntegrationEvent<OrderVerified> message)
    {
        throw new NotImplementedException();
        // emit InventoryReserved of InventoryReservationFailed
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

internal class InventoryAdjustedHandler : IMessageHandler<IntegrationEvent<InventoryAdjusted>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<InventoryAdjusted> message)
    {
        throw new NotImplementedException();
    }
}