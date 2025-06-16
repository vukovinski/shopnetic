using KafkaFlow;

using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents.Order;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration.GetSection("KafkaOptions").Get<KafkaOptions>();
if (config is default(KafkaOptions) ||
    config.KafkaBroker1 is default(string) ||
    config.KafkaBroker2 is default(string) ||
    config.KafkaBroker3 is default(string))
    throw new ApplicationException("KafkaOptions are not configured properly.");

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
            .WithGroupId("order-group")
            .WithWorkersCount(1)
            .WithBufferSize(100)
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddShopneticConsumerMiddleware();
                middlewares.AddTypedHandlers(handlers =>
                {
                    //handlers.WithHandlerLifetime(InstanceLifetime.Singleton)
                    //    .AddHandler<AddToCartHandler>()
                    //    .AddHandler<RemoveFromCartHandler>()
                    //    .AddHandler<UpdateCartItemQuantityHandler>();
                });
            });

            // dodati payment microservis...
        })
        .AddShopneticProducer(ProducerNames.OrderOutput, TopicNames.Order);
    });
});

var app = builder.Build();
var bus = app.Services.CreateKafkaBus();
await bus.StartAsync();
app.Run();
await bus.StopAsync();
