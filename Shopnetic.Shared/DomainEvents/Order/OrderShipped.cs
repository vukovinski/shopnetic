﻿namespace Shopnetic.Shared.DomainEvents.Order
{
    public class OrderShipped
    {
        public int OrderId { get; set; }
        public int CartId { get; set; }
        public required string CustomerName { get; set; }
        public required string Email { get; set; }
    }
}
