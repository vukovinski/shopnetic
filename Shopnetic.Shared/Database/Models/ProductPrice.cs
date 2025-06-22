namespace Shopnetic.Shared.Database
{
    public class ProductPrice
    {         
        public int ProductPriceId { get; set; }
        public int ProductId { get; set; }
        public required decimal Price { get; set; }
        public required DateTime EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public Product Product { get; set; }
    }
}