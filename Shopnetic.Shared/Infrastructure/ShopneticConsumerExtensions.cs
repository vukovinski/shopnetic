using KafkaFlow;
using KafkaFlow.Serializer;
using KafkaFlow.Configuration;
using KafkaFlow.Compressor.Gzip;

namespace Shopnetic.Shared.Infrastructure
{
    public static class ShopneticConsumerExtensions
    {
        public static IConsumerMiddlewareConfigurationBuilder AddShopneticConsumerMiddleware(this IConsumerMiddlewareConfigurationBuilder builder)
        {
            builder.AddDecompressor<GzipMessageDecompressor>();
            builder.AddDeserializer<ProtobufNetDeserializer>();
            return builder;
        }

        public static IClusterConfigurationBuilder AddShopneticConsumer(this IClusterConfigurationBuilder builder, string topicName, string groupId, Action<TypedHandlerConfigurationBuilder> handlerRegistrator)
        {
            builder.AddConsumer(consumer =>
            {
                consumer
                .Topic(topicName)
                .WithGroupId(groupId)
                .WithWorkersCount(1)
                .WithBufferSize(100)
                .AddMiddlewares(middlewares =>
                {
                    middlewares.AddShopneticConsumerMiddleware();
                    middlewares.AddTypedHandlers(handlers =>
                    {
                        handlerRegistrator(handlers.WithHandlerLifetime(InstanceLifetime.Transient));
                    });
                });
            });
            return builder;
        }
    }
}
