using Shopnetic.Admin;
using Shopnetic.Shared.Database;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddControllers();
var app = builder.Build();

app.UseHttpsRedirection();
app.UseMiddleware<EmbeddedFilesMiddleware>();
app.MapFallbackToFile("index.html");
app.MapControllers();
app.Run();

