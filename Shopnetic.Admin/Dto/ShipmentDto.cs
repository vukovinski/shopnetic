namespace Shopnetic.Admin.Dto;

public class ShipmentDto
{
    public int shipmentId { get; set; }
    public int orderId { get; set; }
    public string trackingNumber { get; set; }
    public DateTime shippedDate { get; set; }
    public DateTime deliveryDate { get; set; }
    public string customer { get; set; }
    public string destination { get; set; }
    public string status { get; set; }
}