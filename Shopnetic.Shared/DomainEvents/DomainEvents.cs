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
    }
}
