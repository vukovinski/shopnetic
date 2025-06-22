namespace Shopnetic.Shared.Database
{
    public class Product
    {
        public int ProductId { get; set; }
        public required string ProductName { get; set; }
        public required string ProductDescription { get; set; }

        public virtual ICollection<ProductPrice> ProductPrices { get; set; }
    }
}