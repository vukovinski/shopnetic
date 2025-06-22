namespace Shopnetic.Shared.Database
{
    public partial class ShopneticDbContext
    {
        public class PaymentDiscount
        {
            public int PaymentDiscountId { get; set; }
            public int PaymentId { get; set; }
            public Payment Payment { get; set; }
            public int DiscountId { get; set; }
            public Discount Discount { get; set; }
        }
    }
}