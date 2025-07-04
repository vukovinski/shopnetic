using KafkaFlow;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.DomainEvents.Inventory;

var builder = WebApplication.CreateBuilder(args);
var config = KafkaOptions.ConfigureAndValidate(builder.Configuration);

builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddShopneticKafka(cluster =>
{
    cluster
    .AddShopneticBrokers(config)
    .AddShopneticConsumer(TopicNames.Inventory, "payments-group", handlers =>
    {
        handlers
        .AddHandler<InventoryReservedHandler>();
    })
    .AddShopneticProducer(ProducerNames.PaymentsToPaymentsLoopback, TopicNames.Payments);
});

await builder.RunShopneticMicroserviceAsync();

internal class InventoryReservedHandler : IMessageHandler<IntegrationEvent<InventoryReserved>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<InventoryReserved> message)
    {
        // start payment flow, emit payment succeeded or payment failed
        throw new NotImplementedException();
    }
}