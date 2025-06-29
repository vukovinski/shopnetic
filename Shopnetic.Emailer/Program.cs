using KafkaFlow;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents.Order;

var builder = WebApplication.CreateBuilder(args);
var config = KafkaOptions.ConfigureAndValidate(builder.Configuration);

builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddShopneticKafka(cluster =>
{
    cluster
    .AddShopneticBrokers(config)
    .AddShopneticConsumer(TopicNames.Order, "email-group", handlers =>
    {
        handlers
        .AddHandler<OrderConfirmedHandler>()
        .AddHandler<OrderRejectedHandler>()
        .AddHandler<OrderShippedHandler>();
    });
});

await builder.RunShopneticMicroserviceAsync();

internal class OrderConfirmedHandler : IMessageHandler<IntegrationEvent<OrderConfirmed>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<OrderConfirmed> message)
    {
        throw new NotImplementedException();
    }
}

internal class OrderRejectedHandler : IMessageHandler<IntegrationEvent<OrderRejected>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<OrderRejected> message)
    {
        throw new NotImplementedException();
    }
}

internal class OrderShippedHandler : IMessageHandler<IntegrationEvent<OrderShipped>>
{
    public Task Handle(IMessageContext context, IntegrationEvent<OrderShipped> message)
    {
        throw new NotImplementedException();
    }
}