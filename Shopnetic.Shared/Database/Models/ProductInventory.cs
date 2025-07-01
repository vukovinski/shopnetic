namespace Shopnetic.Shared.Database
{
    public class ProductInventory
    {
        public int ProductInventoryId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public int LowStockThreshold { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}