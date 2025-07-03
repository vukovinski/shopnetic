namespace Shopnetic.Admin.Dto
{
    public class DashboardDataDto
    {
        public int totalOrders { get; set; }
        public decimal ordersPercentChangeMoM { get; set; }
        public decimal totalRevenue { get; set; }
        public decimal revenuePercentChangeMoM { get; set; }
        public int totalProducts { get; set; }
        public decimal productsPrecentChangeMoM { get; set; }
        public int totalCustomers { get; set; }
        public decimal customersPercentChangeMoM { get; set; }
        public List<OrderDto> recentOrders { get; set; }
    }
}