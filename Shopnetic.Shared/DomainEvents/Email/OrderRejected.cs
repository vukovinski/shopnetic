namespace Shopnetic.Shared.DomainEvents.Email
{
    public class OrderRejected
    {
        public int OrderId { get; set; }
        public int CartId { get; set; }
        public required string CustomerName { get; set; }
    }
}
