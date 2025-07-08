using Shopnetic.Shared.Database;
using Shopnetic.Shared.Infrastructure.Web;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddControllers();
var app = builder.Build();

app.UseHttpsRedirection();
app.UseIndexHtmlRedirection();
app.UseSessionIdCookie();
app.UseMiddleware<EmbeddedFilesMiddleware>();
app.MapFallbackToFile("index.html");
app.MapControllers();
app.Run();