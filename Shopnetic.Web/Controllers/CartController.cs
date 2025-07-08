using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Web.Dto;
using Shopnetic.Shared.Database;
using Shopnetic.Shared.Infrastructure.Web;

namespace Shopnetic.Web.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly ShopneticDbContext _context;
        private readonly ILogger<CartController> _logger;

        public CartController(ShopneticDbContext context, ILogger<CartController> logger)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("init")]
        public async Task<IActionResult> InitializeCart()
        {
            // TODO: emit cart created event

            var ipAddress = Request.HttpContext.Connection.RemoteIpAddress!.ToString();
            var sessionId = Guid.Parse(Request.HttpContext.Request.Cookies.First(c => c.Key == SessionIdCookieExtensions.ShopneticUserIdKey).Value);

            var created = false;
            var cartOwner = await _context.CartOwners.FirstOrDefaultAsync(co => co.UserSessionId == sessionId);
            if (cartOwner == null)
            {
                cartOwner = new AnonymousCartOwner
                {
                    IPAddress = ipAddress,
                    UserSessionId = sessionId,
                    LastSeenAt = DateTime.UtcNow
                };
                created = true;
            }
            else
            {
                cartOwner.LastSeenAt = DateTimeOffset.UtcNow;
            }
            if (created) _context.CartOwners.Add(cartOwner);
            else _context.CartOwners.Update(cartOwner);
            var cart = new Cart()
            {
                CreatedAt = DateTime.UtcNow,
                CartContentsJson = "{ Items: [] }",
                CartOwner = cartOwner
            };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
            return Ok(cart.CartId);
        }

        [HttpPut]
        [Route("{cartId}/addItem")]
        public async Task<IActionResult> AddItem(int cartId, [FromBody] CartItemDto cartItem)
        {
            // TODO: emit cart updated, item added event

            if (cartItem == null) return BadRequest(false);
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart == null) return StatusCode(500);

            var cartContents = cart.GetCartContents();
            var existingCartItem = cartContents.Items.FirstOrDefault(i => i.ProductId == cartItem.productId);
            if (existingCartItem != null)
            {
                existingCartItem.Quantity += cartItem.quantity;
                cart.CartContentsJson = cartContents.Serialize();
                _context.Carts.Update(cart);
            }
            else
            {
                var item = new CartItem
                {
                    ProductId = cartItem.productId,
                    Quantity = cartItem.quantity
                };
                cartContents.Items.Add(item);
                cart.CartContentsJson = cartContents.Serialize();
                _context.Carts.Update(cart);
            }
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        [Route("{cartId}/removeItem")]
        public async Task<IActionResult> RemoveItem(int cartId, [FromBody] CartItemDto cartItem)
        {
            // TODO: emit item removed event

            if (cartItem == null) return BadRequest(false);
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart == null) return StatusCode(500);

            var cartContents = cart.GetCartContents();
            var exisitingCartItem = cartContents.Items.FirstOrDefault(i => i.ProductId ==  cartItem.productId);
            if (exisitingCartItem == null) return NotFound(false);
            else
            {
                exisitingCartItem.Quantity -= cartItem.quantity;
                if (exisitingCartItem.Quantity <= 0)
                    cartContents.Items.Remove(exisitingCartItem);

                cart.CartContentsJson = cartContents.Serialize();
                _context.Carts.Update(cart);
                await _context.SaveChangesAsync();
            }
            return Ok(true);
        }
    }
}
