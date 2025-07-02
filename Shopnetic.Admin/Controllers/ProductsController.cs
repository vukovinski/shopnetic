using KafkaFlow.Producers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Admin.Dto;
using Shopnetic.Shared.Database;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly ShopneticDbContext _context;
    //private readonly IProducerAccessor _producers;
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
            var mappedProducts = products.Select(p => new ProductDto
            {
                id = p.ProductId,
                name = p.ProductName,
                description = p.ProductDescription,
                category = new CategoryDto
                {
                    categoryId = p.ProductCategories.First().CategoryId,
                    categoryName = p.ProductCategories.First().Category.CategoryName
                },
                currentPrice = new PriceDto
                {
                    price = p.ProductPrices.First(pp =>
                    {
                        var effectiveFrom = pp.EffectiveFrom <= now;
                        var effectiveTo = pp.EffectiveTo == null || pp.EffectiveTo >= now;
                        var effective = effectiveFrom && effectiveTo;
                        return effective;

                    }).Price
                },
                inventory = new InventoryDto
                {
                    quantity = p.ProductInventories.First().Quantity,
                    lowStockThreshold = p.ProductInventories.First().LowStockThreshold
                },
                status = (ProductStatus)Enum.Parse(typeof(ProductStatus), p.Status),
                sku = p.Sku,
                images = p.ProductImages.Select(pi => new ImageDto
                {
                    imageId = pi.ProductImageId,
                    primary = pi.IsPrimary,
                    imageUrl = Url.Action(nameof(GetProductImage), new { productImageId = pi.ProductImageId })!
                })
                .ToList()
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
            var mappedProduct = new ProductDto
            {
                id = product.ProductId,
                name = product.ProductName,
                description = product.ProductDescription,
                category = new CategoryDto
                {
                    categoryId = product.ProductCategories.First().CategoryId,
                    categoryName = product.ProductCategories.First().Category.CategoryName
                },
                currentPrice = new PriceDto
                {
                    price = product.ProductPrices.First(pp =>
                    {
                        var effectiveFrom = pp.EffectiveFrom <= now;
                        var effectiveTo = pp.EffectiveTo == null || pp.EffectiveTo >= now;
                        var effective = effectiveFrom && effectiveTo;
                        return effective;

                    }).Price
                },
                inventory = new InventoryDto
                {
                    quantity = product.ProductInventories.First().Quantity,
                    lowStockThreshold = product.ProductInventories.First().LowStockThreshold
                },
                status = (ProductStatus)Enum.Parse(typeof(ProductStatus), product.Status),
                sku = product.Sku,
                images = product.ProductImages.Select(pi => new ImageDto
                {
                    imageId = pi.ProductImageId,
                    primary = pi.IsPrimary,
                    imageUrl = Url.Action(nameof(GetProductImage), new { productImageId = pi.ProductImageId })!

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

    [HttpPost]
    [Route("/create")]
    public async Task<IActionResult> AddProduct([FromBody] ProductDto product)
    {
        if (product == null) return BadRequest(-1);
        if (product.images.Count > 0) return BadRequest(-1);

        var newProduct = _context.Products.Add(new Product
        {
            ProductName = product.name,
            ProductDescription = product.description,
            Status = product.status.ToString(),
            Sku = product.sku
        });
        await _context.SaveChangesAsync();

        var now = DateTime.UtcNow;
        var newProductId = newProduct.Entity.ProductId;
        var newProductEntity = (await _context.Products.FindAsync(newProductId))!;
        newProductEntity.ProductPrices.Add(new ProductPrice
        {
            EffectiveFrom = now,
            EffectiveTo = null,
            Price = product.currentPrice.price,
            ProductId = newProductId
        });
        newProductEntity.ProductCategories.Add(new ProductCategory
        {
            CategoryId = product.category.categoryId,
            ProductId = newProductId
        });
        newProductEntity.ProductInventories.Add(new ProductInventory
        {
            LastUpdated = now,
            LowStockThreshold = product.inventory.lowStockThreshold,
            Quantity = product.inventory.quantity,
            ProductId = newProductId
        });
        await _context.SaveChangesAsync();
        return Ok(newProductId);
    }

    [HttpPut]
    public async Task<IActionResult> EditProduct([FromBody] ProductDto product)
    {
        if (product == null) return BadRequest(false);
        var existingProduct = await _context.Products
            .Include(p => p.ProductCategories)
            .Include(p => p.ProductImages)
            .Include(p => p.ProductInventories)
            .Include(p => p.ProductPrices)
            .FirstOrDefaultAsync(p => p.ProductId == product.id);
        if (existingProduct == null) return NotFound(false);

        existingProduct.ProductName = product.name;
        existingProduct.ProductDescription = product.description;

        var currentCategory = existingProduct.ProductCategories.First();
        if (currentCategory.CategoryId != product.category.categoryId)
        {
            existingProduct.ProductCategories.Clear();
            existingProduct.ProductCategories.Add(new ProductCategory
            {
                CategoryId = product.category.categoryId,
                ProductId = product.id
            });
        }

        var now = DateTime.UtcNow;
        var currentPrice = existingProduct.ProductPrices.First(pp =>
        {
            var effectiveFrom = pp.EffectiveFrom <= now;
            var effectiveTo = pp.EffectiveTo == null || pp.EffectiveTo >= now;
            var effective = effectiveFrom && effectiveTo;
            return effective;

        });
        if (currentPrice.Price != product.currentPrice.price)
        {
            currentPrice.EffectiveTo = now;
            existingProduct.ProductPrices.Add(new ProductPrice
            {
                EffectiveFrom = now,
                EffectiveTo = null,
                Price = product.currentPrice.price,
                ProductId = product.id
            });
        }

        var currentInventory = existingProduct.ProductInventories.First();
        if (currentInventory.Quantity != product.inventory.quantity)
        {
            currentInventory.Quantity = product.inventory.quantity;
            // emit stock adjusted event
        }
        currentInventory.LowStockThreshold = product.inventory.lowStockThreshold;

        var currentStatus = (ProductStatus)Enum.Parse(typeof(ProductStatus), existingProduct.Status);
        if (currentStatus != product.status)
        {
            existingProduct.Status = product.status.ToString();
        }

        existingProduct.Sku = product.sku;

        for (int i = 0; i < product.images.Count; i++)
        {
            var productImage = product.images[i];
            var productImageId = productImage.imageId;
            if (existingProduct.ProductImages.Any(pi => pi.ProductImageId == productImageId))
            {
                var existingProductImage = existingProduct.ProductImages.First(pi => pi.ProductImageId == productImageId);
                existingProductImage.Order = i + 1;
            }
        }

        await _context.SaveChangesAsync();
        return Ok(true);
    }

    [HttpPost]
    [Route("/{productId}/uploadimage")]
    public async Task<IActionResult> SaveProductImage(IFormFile imageFile, int productId, [FromQuery] bool primary)
    {
        if (imageFile == null || imageFile.Length == 0) return BadRequest();

        var mimeType = imageFile.ContentType;
        var imageContentsBytes = new MemoryStream();
        var imageContents = imageFile.OpenReadStream();
        var existingProduct = await _context.Products.Include(p => p.ProductImages).FirstAsync(p => p.ProductId == productId);

        if (primary)
        {
            foreach (var productImage in existingProduct.ProductImages)
            {
                productImage.IsPrimary = false;
            }
        }

        await imageContents.CopyToAsync(imageContentsBytes);
        var newProductImage = new ProductImage
        {
            ImageMimeType = mimeType,
            ImageData = imageContentsBytes.ToArray(),
            IsPrimary = primary,
            Order = existingProduct.ProductImages.Count,
            ProductId = existingProduct.ProductId
        };
        existingProduct.ProductImages.Add(newProductImage);
        await _context.SaveChangesAsync();
        return Ok(newProductImage.ProductImageId);
    }

    [HttpGet]
    [Route("/productimage/{productImageId}")]
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