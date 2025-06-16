namespace Shopnetic.Shared.Database
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CartOwnerId { get; set; }
        public required CartOwner CartOwner { get; set; }
        public bool IsRejected { get; set; }
        public bool IsShipped { get; set; }
        public bool IsPaid { get; set; }
        public bool IsProcessed { get; set; }
    }
}