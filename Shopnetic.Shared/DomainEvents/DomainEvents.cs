namespace Shopnetic.Shared.DomainEvents
{
    public static class DomainEvents
    {
        public static class Cart
        {
            public const string Created = "CartCreated";
            public const string ItemAdded = "CartItemAdded";
            public const string ItemRemoved = "CartItemRemoved";
            public const string ItemUpdated = "CartItemUpdated";
        }

        public static class Inventory
        {
            public const string InventoryAdjusted = "InventoryAdjusted";
            public const string InventoryConsumed = "InventoryConsumed";
            public const string InventoryReleased = "InventoryReleased";
            public const string InventoryReservationFailed = "InventoryReservationFailed";
            public const string InventoryReserved = "InventoryReserved";
        }

        public static class Order
        {
            public const string OrderConfirmed = "OrderConfirmed";
            public const string OrderCreated = "OrderCreated";
            public const string OrderRejected = "OrderRejected";
            public const string OrderShipped = "OrderShipped";
        }
    }
}
