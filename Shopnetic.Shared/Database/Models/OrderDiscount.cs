namespace Shopnetic.Shared.Database
{
    public class OrderDiscount
    {
        public int OrderDiscountId { get; set; }
        public int OrderId { get; set; }
        public required Order Order { get; set; }
        public int DiscountId { get; set; }
        public required Discount Discount { get; set; }
        public required decimal DiscountAmount { get; set; }
    }
}