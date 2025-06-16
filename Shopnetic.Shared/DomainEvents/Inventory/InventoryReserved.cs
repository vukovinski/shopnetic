namespace Shopnetic.Shared.DomainEvents.Inventory
{
    public class InventoryReserved
    {
        public int OrderId { get; set; }
        public int CartId { get; set; }
    }
}
