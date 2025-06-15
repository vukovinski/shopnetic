namespace Shopnetic.Shared.DomainEvents.Order;

public class OrderCreated
{
    public int OrderId { get; set; }
    public int CartId { get; set; }
}
