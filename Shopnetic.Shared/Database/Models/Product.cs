namespace Shopnetic.Shared.Database
{
    public class Product
    {
        public int ProductId { get; set; }
        public required string ProductName { get; set; }
        public required string ProductDescription { get; set; }

        public required string Status { get; set; }
        public required string Sku { get; set; }
        public required string Brand { get; set; }
        public required string Features { get; set; }

        public virtual ICollection<ProductImage> ProductImages { get; set; }
        public virtual ICollection<ProductPrice> ProductPrices { get; set; }
        public virtual ICollection<ProductReview> ProductReviews { get; set; }
        public virtual ICollection<ProductCategory> ProductCategories { get; set; }
        public virtual ICollection<ProductInventory> ProductInventories { get; set; }
    }
}