using System.Text.Json;

namespace Shopnetic.Shared.Database
{
    public static class CartContentsExtensions
    {
        public static CartContents Deserialize(this string cartContentsJson)
        {
            if (string.IsNullOrWhiteSpace(cartContentsJson))
            {
                throw new ArgumentException("Cart contents JSON cannot be null or empty.", nameof(cartContentsJson));
            }
            return JsonSerializer.Deserialize<CartContents>(cartContentsJson) 
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
