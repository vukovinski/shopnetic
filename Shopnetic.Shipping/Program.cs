using KafkaFlow;

using Shopnetic.Shared.Database;
using Shopnetic.Shared.Infrastructure;
using Shopnetic.Shared.DomainEvents.Order;

var builder = WebApplication.CreateBuilder(args);
var config = KafkaOptions.ConfigureAndValidate(builder.Configuration);

builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddShopneticKafka(cluster =>
{
    cluster
    .AddShopneticBrokers(config)
    .AddShopneticConsumer(TopicNames.Shipping, "shipping-group", handlers =>
    {
        //handlers
        //.AddHandler<AddToCartHandler>()
        //.AddHandler<RemoveFromCartHandler>()
        //.AddHandler<UpdateCartItemQuantityHandler>();
    });
});

await builder.RunShopneticMicroserviceAsync();