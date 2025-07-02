using System.Reflection;
using Shopnetic.Shared.Database;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddShopneticDbContext(builder.Configuration);
builder.Services.AddControllers();
var app = builder.Build();

var embeddedFileProvider = new ManifestEmbeddedFileProvider(
    Assembly.GetExecutingAssembly(),
    "ClientApp"
);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = embeddedFileProvider,
    RequestPath = ""
});

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

