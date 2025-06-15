namespace Shopnetic.Shared.DomainEvents.Cart;

public class CartCreated
{     
    public int CartId { get; set; }
    public int CartOwnerId { get; set; }
}
