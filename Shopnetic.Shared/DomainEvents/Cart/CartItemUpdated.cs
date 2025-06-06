namespace Shopnetic.Shared.DomainEvents.Cart;

public class CartItemUpdated
{
    public int CartId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}