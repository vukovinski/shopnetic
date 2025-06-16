namespace Shopnetic.Shared.DomainEvents.Inventory
{
    public class InventoryAdjusted
    {
        public int ProductId { get; set; }
        public int NewQuantity { get; set; }
    }
}
