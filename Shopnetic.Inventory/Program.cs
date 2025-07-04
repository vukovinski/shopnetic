using KafkaFlow;
using KafkaFlow.Producers;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.DomainEvents.Order;
using Shopnetic.Shared.DomainEvents.Inventory;

var builder = WebApplication.CreateBuilder(args);
var config = KafkaOptions.ConfigureAndValidate(builder.Configuration);

builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddShopneticKafka(cluster =>
{
    cluster
    .AddShopneticBrokers(config)
    .AddShopneticConsumer(TopicNames.Inventory, "inventory-group", handlers =>
    {
        handlers
        .AddHandler<InventoryAdjustedHandler>()
        .AddHandler<InventoryReleasedHandler>()
        .AddHandler<InventoryConsumedHandler>();
    })
    .AddShopneticConsumer(TopicNames.Order, "inventory-group", handlers =>
    {
        handlers
        .AddHandler<OrderVerifedHandler>();
    })
    .AddShopneticProducer(ProducerNames.InventoryToInventoryLoopback, TopicNames.Inventory);
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