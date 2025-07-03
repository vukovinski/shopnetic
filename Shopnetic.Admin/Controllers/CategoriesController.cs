using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shopnetic.Admin.Dto;
using Shopnetic.Shared.Database;

namespace Shopnetic.Admin.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ShopneticDbContext _context;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ShopneticDbContext context, ILogger<CategoriesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            var categoriesMapped = categories.Select(c => new CategoryDto()
            {
                categoryId = c.CategoryId,
                categoryName = c.CategoryName
            });
            return Ok(categoriesMapped);
        }
    }
}
