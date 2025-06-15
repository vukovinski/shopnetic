using System.Text.Json;

namespace Shopnetic.Shared.Database
{
    public static class CartContentsExtensions
    {
        public static CartContents Deserialize(this Cart cart)
        {
            if (string.IsNullOrWhiteSpace(cart.CartContentsJson))
            {
                throw new ArgumentException("Cart contents JSON cannot be null or empty.", nameof(cart.CartContentsJson));
            }
            return JsonSerializer.Deserialize<CartContents>(cart.CartContentsJson) 
                   ?? throw new InvalidOperationException("Deserialized cart contents cannot be null.");
        }

        public static string Serialize(this CartContents cartContents)
        {
            if (cartContents is null)
            {
                throw new ArgumentNullException(nameof(cartContents), "Cart contents cannot be null.");
            }
            return JsonSerializer.Serialize(cartContents);
        }
    }
}
