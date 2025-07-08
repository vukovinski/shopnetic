namespace Shopnetic.Shared.Infrastructure.Web;

public static class IndexHtmlRedirectionExtensions
{
    public static WebApplication? UseIndexHtmlRedirection(this WebApplication app)
    {
        app.Use(async (context, next) =>
        {
            if (context.Request.Path.Value!.StartsWith("/api"))
            {
                await next();
                return;
            }

            if (context.Request.Path.Value == "/")
            {
                context.Request.Path = "/index.html";
                await next();
                return;
            }

            await next();
        });
        return app;
    }
}
