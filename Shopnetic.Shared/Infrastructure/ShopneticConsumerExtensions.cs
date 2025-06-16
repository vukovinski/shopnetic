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
    }
}
