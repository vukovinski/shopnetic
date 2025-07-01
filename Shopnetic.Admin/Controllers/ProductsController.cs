using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Shared.Database;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly ShopneticDbContext _context;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(ShopneticDbContext context, ILogger<ProductsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        try
        {
            var now = DateTime.UtcNow;
            var products = await _context.Products
                .Include(p => p.ProductPrices)
                .Include(p => p.ProductInventories)
                .Include(p => p.ProductImages)
                .Include(p => p.ProductCategories)
                .ToListAsync();
            var mappedProducts = products.Select(p => new
            {
                id = p.ProductId,
                name = p.ProductName,
                description = p.ProductDescription,
                category = new
                {
                    categoryId = p.ProductCategories.First().CategoryId,
                    categoryName = p.ProductCategories.First().Category.CategoryName
                },
                currentPrice = new
                {
                    price = p.ProductPrices.First(pp =>
                    {
                        var effectiveFrom = pp.EffectiveFrom <= now;
                        var effectiveTo = pp.EffectiveTo == null || pp.EffectiveTo >= now;
                        var effective = effectiveFrom && effectiveTo;
                        return effective;
                    })
                },
                inventory = new
                {
                    quantity = p.ProductInventories.First().Quantity,
                    lowStockThreshold = p.ProductInventories.First().LowStockThreshold
                },
                status = p.Status,
                sku = p.Sku,
                images = p.ProductImages.Select(pi => new
                {
                    imageId = pi.ProductImageId,
                    primary = pi.IsPrimary,
                    imageUrl = Url.Action(nameof(GetProductImage), new { productImageId = pi.ProductImageId })

                }).ToList()
            });
            return Ok(mappedProducts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving products.");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet]
    [Route("/{productId}")]
    public async Task<IActionResult> GetProduct(int productId)
    {
        try
        {
            var now = DateTime.UtcNow;
            var product = await _context.Products
                .Include(p => p.ProductPrices)
                .Include(p => p.ProductInventories)
                .Include(p => p.ProductImages)
                .Include(p => p.ProductCategories)
                .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product == null) return NotFound();
            var mappedProduct = new
            {
                id = product.ProductId,
                name = product.ProductName,
                description = product.ProductDescription,
                category = new
                {
                    categoryId = product.ProductCategories.First().CategoryId,
                    categoryName = product.ProductCategories.First().Category.CategoryName
                },
                currentPrice = new
                {
                    price = product.ProductPrices.First(pp =>
                    {
                        var effectiveFrom = pp.EffectiveFrom <= now;
                        var effectiveTo = pp.EffectiveTo == null || pp.EffectiveTo >= now;
                        var effective = effectiveFrom && effectiveTo;
                        return effective;
                    })
                },
                inventory = new
                {
                    quantity = product.ProductInventories.First().Quantity,
                    lowStockThreshold = product.ProductInventories.First().LowStockThreshold
                },
                status = product.Status,
                sku = product.Sku,
                images = product.ProductImages.Select(pi => new
                {
                    imageId = pi.ProductImageId,
                    primary = pi.IsPrimary,
                    imageUrl = Url.Action(nameof(GetProductImage), new { productImageId = pi.ProductImageId })

                }).ToList()
            };
            return Ok(mappedProduct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving products.");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("/productimage/{productImageId}")]
    public async Task<IActionResult> GetProductImage(int productImageId)
    {
        try
        {
            var productImage = await _context.ProductImages.FindAsync(productImageId);
            if (productImage == null || productImage.ImageData == null)
            {
                return NotFound();
            }
            return File(productImage.ImageData, productImage.ImageMimeType);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving the product image.");
            return StatusCode(500, "Internal server error");
        }
    }
}