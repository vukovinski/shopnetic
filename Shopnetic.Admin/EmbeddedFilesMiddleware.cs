using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;

namespace Shopnetic.Admin;

public class EmbeddedFilesMiddleware
{
    private readonly RequestDelegate _next;
    private readonly Assembly _assembly = Assembly.GetExecutingAssembly();
    private readonly FileExtensionContentTypeProvider _contentTypes = new();

    public EmbeddedFilesMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value?.TrimStart('/') ?? "index.html";
        if (string.IsNullOrWhiteSpace(path)) path = "index.html";

        var resourceName = $"Shopnetic.Admin.ClientApp.dist.{path.Replace("/", ".")}";

        using var stream = _assembly.GetManifestResourceStream(resourceName);
        if (stream == null)
        {
            await _next(context);
        }
        else
        {
            var fileName = Path.GetFileName(path);
            if (!_contentTypes.TryGetContentType(fileName, out var contentType))
                contentType = "application/octet-stream";

            context.Response.ContentType = contentType;
            await stream!.CopyToAsync(context.Response.Body);
        }
    }
}
