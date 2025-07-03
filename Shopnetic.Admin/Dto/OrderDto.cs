namespace Shopnetic.Admin.Dto;

public class OrderDto
{
    public int orderId { get; set; }
    public string customerName { get; set; }
    public DateTime orderDate { get; set; }
    public decimal totalAmount { get; set; }
    public string status { get; set; }
    public List<OrderItemDto> items { get; set; }
}
