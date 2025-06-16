using KafkaFlow;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.DomainEvents;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents.Order;

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

var app = builder.Build();
var bus = app.Services.CreateKafkaBus();
await bus.StartAsync();
app.Run();
await bus.StopAsync();

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