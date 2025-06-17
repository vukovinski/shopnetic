namespace Shopnetic.Shared.DomainEvents.Payments
{
    public class PaymentFailed
    {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public int CartOwnerId { get; set; }
        public required string Reason { get; set; }
    }
}
