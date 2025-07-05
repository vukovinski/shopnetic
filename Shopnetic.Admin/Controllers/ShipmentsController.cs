using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Admin.Dto;
using Shopnetic.Shared.Database;

namespace Shopnetic.Admin.Controllers
{
    [ApiController]
    [Route("api/shipments")]
    public class ShipmentsController : ControllerBase
    {
        public readonly ShopneticDbContext _context;
        public readonly ILogger<ShipmentsController> _logger;

        public ShipmentsController(ShopneticDbContext context, ILogger<ShipmentsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetShipments()
        {
            var shipments = await _context.Shipments.ToListAsync();
            var shipmentsMapped = shipments.Select(s => new ShipmentDto
            {
                shipmentId = s.ShipmentId,
                orderId = s.OrderId,
                shippedDate = s.DispatchedAt?.UtcDateTime ?? DateTime.UtcNow,
                deliveryDate = s.DeliveredAt?.UtcDateTime ?? DateTime.UtcNow,
                status = s.ShipmentStatus,
                trackingNumber = s.TrackingNumber,
                destination = $"{s.ShippingAddress.City}, {s.ShippingAddress.Country}",
                customer = $"{s.ShippingAddress.FullName}"

            }).ToList();
            return Ok(shipmentsMapped);
        }
    }
}
