namespace Shopnetic.Admin.Dto;

public class OrderItemDto
{
    public int orderItemId { get; set; }
    public int productId { get; set; }
    public string productName { get; set; }
    public int quantity { get; set; }
    public decimal price { get; set; }
}