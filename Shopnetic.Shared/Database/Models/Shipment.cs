namespace Shopnetic.Shared.Database
{
    public class Shipment
    {
        public int ShipmentId { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int CartOwnerId { get; set; }
        public CartOwner CartOwner { get; set; }

        public required string ShipmentStatus { get; set; }
        public required string Carrier { get; set; }
        public required string TrackingNumber { get; set; }

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset? DispatchedAt { get; set; }
        public DateTimeOffset? DeliveredAt { get; set; }
        public DateTimeOffset? FailedAt { get; set; }

        public string? FailureReason { get; set; }

        public required ShippingAddress ShippingAddress { get; set; }
    }
}