namespace Shopnetic.Shared.DomainEvents.Payments
{
    public class PaymentSucceeded
    {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public int CartOwnerId { get; set; }
        public decimal Amount { get; set; }
        public required string Currency { get; set; }
        public DateTimeOffset ConfirmedAt { get; set; } = DateTimeOffset.UtcNow;
    }
}
