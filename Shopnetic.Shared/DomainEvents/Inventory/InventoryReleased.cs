namespace Shopnetic.Shared.DomainEvents.Inventory
{
    public class InventoryReleased
    {
        public int OrderId { get; set; }
        public int CartId { get; set; }
    }
}
