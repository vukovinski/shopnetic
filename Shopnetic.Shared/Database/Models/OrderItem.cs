namespace Shopnetic.Shared.Database
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public required decimal Price { get; set; }
        public required int Quantity { get; set; }
    }
}