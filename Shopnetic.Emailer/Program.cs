using KafkaFlow;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents.Order;

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
            .Topic(TopicNames.Order)
            .WithGroupId("email-group")
            .WithWorkersCount(1)
            .WithBufferSize(100)
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddShopneticConsumerMiddleware();
                middlewares.AddTypedHandlers(handlers =>
                {
                    handlers.WithHandlerLifetime(InstanceLifetime.Transient)
                        .AddHandler<OrderConfirmedHandler>()
                        .AddHandler<OrderRejectedHandler>()
                        .AddHandler<OrderShippedHandler>();
                });
            });
        });
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