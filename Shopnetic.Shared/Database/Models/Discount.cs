namespace Shopnetic.Shared.Database
{
    public abstract class Discount
    {
        public int DiscountId { get; set; }
        public required string DiscountCode { get; set; }
        public required DateTime EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
    }

    public class ProductDiscount : Discount
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public required decimal DiscountAmount { get; set; }
    }

    public class CartDiscount : Discount
    {
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public required decimal DiscountAmount { get; set; }
    }
}