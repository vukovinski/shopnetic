using KafkaFlow;

namespace Shopnetic.Shared.Infrastructure
{
    public static class ShopneticMicroserviceRunner
    {
        public static async Task RunShopneticMicroserviceAsync(this WebApplicationBuilder builder)
        {
            var app = builder.Build();
            var bus = app.Services.CreateKafkaBus();
            await bus.StartAsync();
            app.Run();
            await bus.StopAsync();
        }
    }
}
