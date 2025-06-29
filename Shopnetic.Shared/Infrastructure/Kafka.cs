using KafkaFlow;
using KafkaFlow.Configuration;

namespace Shopnetic.Shared.Infrastructure
{
    public static class Kafka
    {
        public static IServiceCollection AddShopneticKafka(this IServiceCollection services, Action<IClusterConfigurationBuilder> clusterBuilderAction)
        {
            services.AddKafka(kafka =>
            {
                kafka.UseMicrosoftLog();
                kafka.AddCluster(clusterBuilderAction);
            });
            return services;
        }

        public static IClusterConfigurationBuilder AddShopneticBrokers(this IClusterConfigurationBuilder builder, KafkaOptions options)
        {
            builder.WithBrokers([options.KafkaBroker1, options.KafkaBroker2, options.KafkaBroker3]);
            return builder;
        }
    }
}
