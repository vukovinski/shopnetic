using Shopnetic.Shared.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Shopnetic.Shared;

public class ShopneticDbContextDesignTimeFactory : IDesignTimeDbContextFactory<ShopneticDbContext>
{
    public ShopneticDbContext CreateDbContext(string[] args)
    {
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .AddJsonFile($"appsettings.{env}.json", optional: true)
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<ShopneticDbContext>();
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        optionsBuilder.UseNpgsql(connectionString);

        return new ShopneticDbContext(optionsBuilder.Options);
    }
}