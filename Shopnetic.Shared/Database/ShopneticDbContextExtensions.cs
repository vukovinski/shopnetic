using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Shopnetic.Shared.Database
{
    public static class ShopneticDbContextExtensions
    {
        public static void AddShopneticDbContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ShopneticDbContext>(options =>
                options.UseNpgsql(config.GetConnectionString("DefaultConnection")));
        }
    }
}
