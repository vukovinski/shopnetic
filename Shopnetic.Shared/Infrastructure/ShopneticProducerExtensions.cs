using KafkaFlow;
using KafkaFlow.Serializer;
using KafkaFlow.Configuration;
using KafkaFlow.Compressor.Gzip;

namespace Shopnetic.Shared.Infrastructure
{
    public static class ShopneticProducerExtensions
    {
        public static IProducerMiddlewareConfigurationBuilder AddShopneticProducerMiddleware(this IProducerMiddlewareConfigurationBuilder builder)
        {
            builder.AddSerializer<ProtobufNetSerializer>();
            builder.AddCompressor<GzipMessageCompressor>();
            return builder;
        }

        public static IClusterConfigurationBuilder AddShopneticProducer(this IClusterConfigurationBuilder builder, string producerName, string topic)
        {
            builder.AddProducer(producerName, producer =>
            {
                producer.DefaultTopic(topic);
                producer.AddMiddlewares(middlewares => middlewares.AddShopneticProducerMiddleware());
            });
            return builder;
        }
    }
}
