using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Shared.Database;
using Shopnetic.Web.Dto;

namespace Shopnetic.Web.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly ShopneticDbContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(ShopneticDbContext context, ILogger<ProductsController> logger)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _context.Products.AsNoTracking()
                .Include(p => p.ProductCategories).ThenInclude(pc => pc.Category)
                .Include(p => p.ProductImages)
                .Include(p => p.ProductPrices)
                .Include(p => p.ProductReviews)
                .Include(p => p.ProductInventories);

            var now = DateTime.UtcNow;
            var mappedProducts = products.Select(p => new ProductDto
            {
                id = p.ProductId.ToString(),
                name = p.ProductName,
                price = p.ProductPrices
                    .Where(pp => pp.EffectiveFrom <= now)
                    .OrderByDescending(pp => pp.EffectiveFrom)
                    .First().Price,
                description = p.ProductDescription,
                sku = p.Sku,
                brand = p.Brand,
                category = p.ProductCategories.Single().Category.CategoryName,
                rating = p.ProductReviews.Any() ? (decimal)p.ProductReviews.Average(pr => pr.ReviewRating) : 0m,
                reviewCount = p.ProductReviews.Count,
                reviews = p.ProductReviews.Select(pr => new ReviewDto
                {
                    user = pr.ReviewerName,
                    comment = pr.ReviewText,
                    date = pr.ReviewDate,
                    rating = pr.ReviewRating

                }).ToList(),
                features = p.Features.Split(';', StringSplitOptions.None).ToList(),
                inStock = p.ProductInventories.First().Quantity >= 0,
                inventory = p.ProductInventories.First().Quantity,
                isNew = false,
                isFeatured = false,
                images = p.ProductImages.Select(pi => Url.Action(nameof(GetProductImage), new { imageId = pi.ProductImageId })).ToList()!

            }).ToList();
            return Ok(mappedProducts);
        }

        [HttpGet]
        [Route("image/{imageId}")]
        public async Task<IActionResult> GetProductImage(int imageId)
        {
            var productImage = await _context.ProductImages.FindAsync(imageId);
            if (productImage == null) return NotFound();

            return File(productImage.ImageData, productImage.ImageMimeType);
        }
    }
}
