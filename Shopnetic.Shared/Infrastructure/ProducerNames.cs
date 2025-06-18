namespace Shopnetic.Shared.Infrastructure
{
    public static class ProducerNames
    {
        public const string OrderToOrderLoopback = "order-loopback";
        public const string InventoryToInventoryLoopback = "inventory-loopback";
        public const string PaymentsToOrderOutput = "payments-order-output";
    }
}
