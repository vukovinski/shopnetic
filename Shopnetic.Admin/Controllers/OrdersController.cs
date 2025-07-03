using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Admin.Dto;
using Shopnetic.Shared.Database;

namespace Shopnetic.Admin.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly ShopneticDbContext _context;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(ShopneticDbContext context, ILogger<OrdersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product).ToListAsync();
            var mappedOrders = orders.Select(o => new OrderDto
            {
                orderId = o.OrderId,
                orderDate = o.CreatedAt,
                status = "Created",
                customerName = o.ShippingAddress.FullName,
                totalAmount = o.OrderTotal,
                items = o.OrderItems.Select(oi => new OrderItemDto
                {
                    orderItemId = oi.OrderItemId,
                    productId = oi.ProductId,
                    productName = oi.Product.ProductName,
                    price = oi.Price,
                    quantity = oi.Quantity,
                    sku = oi.Product.Sku

                }).ToList()

            }).ToList();
            return Ok(mappedOrders);
        }

        [HttpPut]
        public async Task<IActionResult> EditOrder([FromBody] OrderDto order)
        {
            // TODO: edit order
            return Ok(true);
        }
    }
}
