namespace Shopnetic.Shared.Database
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CartOwnerId { get; set; }
        public CartOwner CartOwner { get; set; }
        public bool IsRejected { get; set; }
        public bool IsShipped { get; set; }
        public bool IsPaid { get; set; }
        public bool IsProcessed { get; set; }
        public decimal OrderTotal { get; set; }
        public required ShippingAddress ShippingAddress { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<OrderDiscount> OrderDiscounts { get; set; }
    }
}