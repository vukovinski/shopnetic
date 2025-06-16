namespace Shopnetic.Shared.DomainEvents.Email
{
    public class OrderConfirmed
    {
        public int OrderId { get; set; }
        public int CartId { get; set; }
        public required string CustomerName { get; set; }
    }
}
