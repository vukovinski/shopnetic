using KafkaFlow;
using Shopnetic.Shared;
using KafkaFlow.Serializer;
using KafkaFlow.Compressor.Gzip;
using Shopnetic.Shared.DomainEvents.Cart;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddKafka(kafka =>
{
    kafka.UseMicrosoftLog();
    var config = builder.Configuration.GetSection("KafkaOptions").Get<KafkaOptions>();
    if (config is default(KafkaOptions) ||
        config.KafkaBroker1 is default(string) ||
        config.KafkaBroker2 is default(string) ||
        config.KafkaBroker3 is default(string))
        throw new ApplicationException("KafkaOptions are not configured properly.");

    kafka.AddCluster(cluster =>
    {
        cluster
        .WithBrokers([config.KafkaBroker1, config.KafkaBroker2, config.KafkaBroker3])
        .AddConsumer(consumer =>
        {
            consumer
            .Topic("order-events")
            .WithGroupId("order-group")
            .WithName("order-consumer")
            .WithWorkersCount(1)
            .WithBufferSize(1000)
            .AddMiddlewares(middlewares =>
            {
                middlewares.AddDecompressor<GzipMessageDecompressor>();
                middlewares.AddDeserializer<ProtobufNetDeserializer>();
                middlewares.AddTypedHandlers(handlers =>
                {
                    //handlers.WithHandlerLifetime(InstanceLifetime.Singleton)
                    //    .AddHandler<AddToCartHandler>()
                    //    .AddHandler<RemoveFromCartHandler>()
                    //    .AddHandler<UpdateCartItemQuantityHandler>();
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
