using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Admin.Dto;
using Shopnetic.Shared.Database;

namespace Shopnetic.Admin.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly ShopneticDbContext _context;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(ShopneticDbContext context, ILogger<DashboardController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetDashboardData()
        {
            var now = DateTime.UtcNow;
            var monthAgo = now.AddMonths(-1);
            var twoMonthsAgo = now.AddMonths(-2);

            var orders = _context.Orders.Where(o => o.CreatedAt > monthAgo);
            var previousOrders = _context.Orders.Where(o => o.CreatedAt > twoMonthsAgo && o.CreatedAt < now);

            var totalOrders = orders.Count();
            var totalOrdersPreviously = previousOrders.Count();
            var totalOrdersChangeMoM = (totalOrders - totalOrdersPreviously) / totalOrdersPreviously * 100.0m;

            var totalRevenue = orders.Select(o => o.OrderTotal).Sum();
            var totalRevenuePreviously = previousOrders.Select(o => o.OrderTotal).Sum();
            var totalRevenueChangeMoM = (totalRevenue - totalRevenuePreviously) / totalRevenuePreviously * 100.0m;

            var totalCustomers = orders.Select(o => o.ShippingAddress.FullName).Distinct().Count();
            var totalCustomersPreviously = previousOrders.Select(o => o.ShippingAddress.FullName).Distinct().Count();
            var totalCustomersChangeMoM = (totalCustomers - totalCustomersPreviously) / totalCustomersPreviously * 100.0m;

            var totalProducts = orders.SelectMany(o => o.OrderItems).Select(o => o.ProductId).Distinct().Count();
            var totalProducstPreviously = previousOrders.SelectMany(o => o.OrderItems).Select(o => o.ProductId).Distinct().Count();
            var totalProductsChangeMoM = (totalProducts - totalProducstPreviously) / totalProducstPreviously * 100.0m;

            var recentOrders = _context.Orders.OrderByDescending(o => o.CreatedAt).Take(25);
            var recentOrdersMapped = recentOrders.Select(o => new OrderDto
            {
                orderId = o.OrderId,
                orderDate = o.CreatedAt,
                customerName = o.ShippingAddress.FullName,
                status = "Created",
                totalAmount = o.OrderTotal,
                items = o.OrderItems.Select(oi => new OrderItemDto
                {
                    orderItemId = oi.OrderItemId,
                    productId = oi.ProductId,
                    productName = oi.Product.ProductName,
                    quantity = oi.Quantity,
                    price = oi.Price

                }).ToList()
            }).ToList();

            var result = new DashboardDataDto
            {
                totalOrders = totalOrders,
                totalCustomers = totalCustomers,
                totalProducts = totalProducts,
                totalRevenue = totalRevenue,
                ordersPercentChangeMoM = totalOrdersChangeMoM,
                customersPercentChangeMoM = totalCustomersChangeMoM,
                productsPrecentChangeMoM = totalProductsChangeMoM,
                revenuePercentChangeMoM = totalRevenueChangeMoM,
                recentOrders = recentOrdersMapped
            };
            return Ok(result);
        }
    }
}
