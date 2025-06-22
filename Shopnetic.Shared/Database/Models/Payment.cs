namespace Shopnetic.Shared.Database
{
    public partial class ShopneticDbContext
    {
        public class Payment
        {
            public int PaymentId { get; set; }
            public int CartOwnerId { get; set; }
            public CartOwner CartOwner { get; set; }
            public int OrderId { get; set; }
            public Order Order { get; set; }
            public required decimal Amount { get; set; }
            public required decimal TotalDiscount { get; set; }
            public required decimal AmountWithoutDiscount { get; set; }
            public required string CurrencyCode { get; set; }
            public required DateTimeOffset? PaidAt { get; set; } = null;
            public required DateTimeOffset? DeclinedAt { get; set; } = null;
            public bool IsPaid { get; set; }
            public bool IsDeclined { get; set; }

            public virtual ICollection<PaymentDiscount> PaymentDiscounts { get; set; }
        }
    }
}