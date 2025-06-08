namespace Shopnetic.Shared.Database
{
    public class ProductInventory
    {
        public int ProductInventoryId { get; set; }
        public int ProductId { get; set; }
        public required Product Product { get; set; }
        public int Quantity { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}