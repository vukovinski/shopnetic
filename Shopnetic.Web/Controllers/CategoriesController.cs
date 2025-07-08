using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Web.Dto;
using Shopnetic.Shared.Database;

namespace Shopnetic.Web.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ShopneticDbContext _context;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ShopneticDbContext context, ILogger<CategoriesController> logger)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories.AsNoTracking().ToListAsync();
            var categoriesMapped = categories.Select(c => new CategoryDto
            {
                id = c.CategoryId,
                name = c.CategoryName,
                image = Url.Action(nameof(GetCategoryImage), new { categoryId = c.CategoryId })!,
                productCount = _context.ProductCategories.AsNoTracking().Where(pc => pc.CategoryId == c.CategoryId).Count()

            }).OrderBy(c => c.name).ToList();
            return Ok(categoriesMapped);
        }

        [HttpGet("image/{categoryId}")]
        public async Task<IActionResult> GetCategoryImage(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null) return NotFound();

            return File(category.CategoryImageData, category.CategoryImageMimeType);
        }
    }
}
