namespace Shopnetic.Shared.Database
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public required Order Order { get; set; }
        public int ProductId { get; set; }
        public required Product Product { get; set; }
        public required decimal Price { get; set; }
        public required int Quantity { get; set; }
    }
}