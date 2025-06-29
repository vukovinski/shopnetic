namespace Shopnetic.Shared.Infrastructure
{
    public class KafkaOptions
    {
        public required string KafkaBroker1 { get; set; }
        public required string KafkaBroker2 { get; set; }
        public required string KafkaBroker3 { get; set; }

        public static void Validate(KafkaOptions kafkaOptions)
        {
            var broker1okay = !string.IsNullOrWhiteSpace(kafkaOptions.KafkaBroker1) && IsValidHostAndPort(kafkaOptions.KafkaBroker1);
            var broker2okay = !string.IsNullOrWhiteSpace(kafkaOptions.KafkaBroker2) && IsValidHostAndPort(kafkaOptions.KafkaBroker2);
            var broker3okay = !string.IsNullOrWhiteSpace(kafkaOptions.KafkaBroker3) && IsValidHostAndPort(kafkaOptions.KafkaBroker3);
            if (!broker1okay || !broker2okay || !broker3okay)
                throw new ApplicationException("KafkaOptions not configured properly.");
        }

        public static KafkaOptions ConfigureAndValidate(IConfiguration configuration)
        {
            var kafkaOptions = configuration.GetSection("KafkaOptions").Get<KafkaOptions>();
            if (kafkaOptions == null)
                throw new ApplicationException("KafkaOptions section not found in configuration.");
            Validate(kafkaOptions);
            return kafkaOptions;
        }

        private static bool IsValidHostname(string hostname)
        {
            return Uri.CheckHostName(hostname) != UriHostNameType.Unknown;
        }

        private static bool IsValidPort(string portString, out int port)
        {
            return int.TryParse(portString, out port) && port >= 1 && port <= 65535;
        }

        private static bool IsValidHostAndPort(string input)
        {
            var parts = input.Split(':');
            if (parts.Length != 2) return false;

            string hostname = parts[0];
            string portStr = parts[1];

            return IsValidHostname(hostname) && IsValidPort(portStr, out _);
        }
    }
}
