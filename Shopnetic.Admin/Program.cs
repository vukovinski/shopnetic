using Shopnetic.Shared.Database;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddControllers();
var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

