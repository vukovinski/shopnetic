namespace Shopnetic.Shared.Database
{
    public class CartItem : IEquatable<CartItem>
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public bool Equals(CartItem? other)
        {
            if (other is null) return false;
            return ProductId == other.ProductId;
        }
    }
}
