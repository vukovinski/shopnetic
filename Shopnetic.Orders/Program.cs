using KafkaFlow;

using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents.Order;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration.GetSection("KafkaOptions").Get<KafkaOptions>()!;
KafkaOptions.Validate(config);

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
        .AddShopneticProducer(ProducerNames.OrderToOrderLoopback, TopicNames.Order);
    });
});

var app = builder.Build();
var bus = app.Services.CreateKafkaBus();
await bus.StartAsync();
app.Run();
await bus.StopAsync();
