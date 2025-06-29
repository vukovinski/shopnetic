using KafkaFlow;
using KafkaFlow.Producers;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.DomainEvents.Order;
using Shopnetic.Shared.DomainEvents.Inventory;
using Shopnetic.Shared.DomainEvents.Payments;

var builder = WebApplication.CreateBuilder(args);
var config = KafkaOptions.ConfigureAndValidate(builder.Configuration);

builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddKafka(kafka =>
{
    kafka.UseMicrosoftLog();
    kafka.AddCluster(cluster =>
    {
        cluster
        .WithBrokers([config.KafkaBroker1, config.KafkaBroker2, config.KafkaBroker3])
        .AddShopneticConsumer(TopicNames.Order, "order-group", handlers =>
        {
            handlers
            .AddHandler<OrderCreatedHandler>();
        })
        .AddShopneticConsumer(TopicNames.Inventory, "order-group", handlers =>
        {
            handlers
            .AddHandler<InventoryReservationFailedHandler>();
        })
        .AddShopneticConsumer(TopicNames.Payments, "order-group", handlers =>
        {
            handlers
            .AddHandler<PaymentSucceededHandler>();
        })
        .AddShopneticProducer(ProducerNames.OrderToOrderLoopback, TopicNames.Order);
    });
});

await builder.RunShopneticMicroserviceAsync();

internal class OrderCreatedHandler : IMessageHandler<IntegrationEvent<OrderCreated>>
{
    private readonly IMessageProducer _producer;
    private readonly ShopneticDbContext _dbContext;

    public OrderCreatedHandler(ShopneticDbContext dbContext, IProducerAccessor producers)
    {
        _dbContext = dbContext;
        _producer = producers[ProducerNames.OrderToOrderLoopback];
    }

    public Task Handle(IMessageContext context, IntegrationEvent<OrderCreated> message)
    {
        // check order against business rules, emit order verified event or order rejected event
        throw new NotImplementedException();
    }
}

internal class InventoryReservationFailedHandler : IMessageHandler<IntegrationEvent<InventoryReservationFailed>>
{
    private readonly IMessageProducer _producer;
    private readonly ShopneticDbContext _dbContext;

    public InventoryReservationFailedHandler(ShopneticDbContext dbContext, IProducerAccessor producers)
    {
        _dbContext= dbContext;
        _producer = producers[ProducerNames.OrderToOrderLoopback];
    }

    public Task Handle(IMessageContext context, IntegrationEvent<InventoryReservationFailed> message)
    {
        // mark order rejcted, emit order rejected event
        throw new NotImplementedException();
    }
}

internal class PaymentSucceededHandler : IMessageHandler<IntegrationEvent<PaymentSucceeded>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<PaymentSucceeded> message)
    {
        // confirm the order, emit order confirmed
        throw new NotImplementedException();
    }
}