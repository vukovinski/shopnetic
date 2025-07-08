namespace Shopnetic.Shared.Infrastructure.Web
{
    public static class SessionIdCookieExtensions
    {
        public const string ShopneticUserIdKey = "ShopneticUserId";

        public static WebApplication UseSessionIdCookie(this WebApplication app)
        {
            app.Use(async (context, next) =>
            {
                if (!context.Request.Cookies.ContainsKey(ShopneticUserIdKey))
                {
                    var userId = Guid.CreateVersion7().ToString();
                    context.Response.Cookies.Append(ShopneticUserIdKey, userId, new CookieOptions
                    {
                        Secure = true,
                        HttpOnly = true,
                        IsEssential = true,
                        Expires = DateTimeOffset.UtcNow.AddYears(10)
                    });
                }
                await next();
            });
            return app;
        }
    }
}
