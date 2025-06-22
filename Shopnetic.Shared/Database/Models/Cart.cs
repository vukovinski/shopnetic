namespace Shopnetic.Shared.Database
{
    public class Cart
    {
        public int CartId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CartOwnerId { get; set; }
        public CartOwner CartOwner { get; set; }
        public required string CartContentsJson { get; set; }

        public CartContents GetCartContents() => this.Deserialize();
    }
}
