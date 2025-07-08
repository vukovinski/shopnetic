using Microsoft.AspNetCore.Mvc;

using Shopnetic.Web.Dto;
using Shopnetic.Shared.Database;

namespace Shopnetic.Web.Controllers
{
    [ApiController]
    [Route("api/checkout")]
    public class CheckoutController : ControllerBase
    {
        private readonly ShopneticDbContext _context;
        private readonly ILogger<CheckoutController> _logger;

        public CheckoutController(ShopneticDbContext context, ILogger<CheckoutController> logger)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [Route("finalize/{cartId}")]
        public async Task<IActionResult> FinalizeOrder(int cartId, [FromBody] ShippingAndPaymentDto shippingAndPayment)
        {
            if (shippingAndPayment == null) return BadRequest(-1);
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart == null) return NotFound(-1);

            // TODO: emit order created event
            var cartOwner = (await _context.CartOwners.FindAsync(cart.CartOwnerId))!;
            var order = new Order
            {
                OrderStatus = "Created",
                CartOwner = cartOwner,
                CreatedAt = DateTime.UtcNow,
                IsPaid = false,
                IsProcessed = false,
                IsRejected = false,
                IsShipped = false,
                OrderTotal = 0m,
                ShippingAddress = new ShippingAddress
                {
                    Street = shippingAndPayment.shippingInfo.addressLine1,
                    Country = shippingAndPayment.shippingInfo.country,
                    City = shippingAndPayment.shippingInfo.city,
                    FullName = $"{shippingAndPayment.shippingInfo.firstName} {shippingAndPayment.shippingInfo.lastName}",
                    Phone = "",
                    PostalCode = shippingAndPayment.shippingInfo.postalCode
                }
            };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return Ok(order.OrderId);
        }

        [HttpGet]
        [Route("check/{orderId}")]
        public async Task<IActionResult> CheckOrderStatus(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return NotFound();
            else return Ok(order.OrderStatus);
        }
    }
}
