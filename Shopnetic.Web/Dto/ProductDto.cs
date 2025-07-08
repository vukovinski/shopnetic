namespace Shopnetic.Web.Dto;

public class ProductDto
{
    public required string id { get; set; }
    public required string name { get; set; }
    public decimal price { get; set; }
    public decimal? originalPrice { get; set; } = null;
    public required string sku { get; set; }
    public required string description { get; set; }
    public required List<string> images { get; set; }
    public required string category { get; set; }
    public required string brand { get; set; }
    public decimal rating { get; set; }
    public int reviewCount { get; set; }
    public required List<ReviewDto> reviews { get; set; }
    public required List<string> features { get; set; }
    public bool inStock { get; set; }
    public int inventory { get; set; }
    public bool? isNew { get; set; } = null;
    public bool? isFeatured { get; set; } = null;
}

public class ReviewDto
{
    public required string user { get; set; }
    public required string comment { get; set; }
    public DateTime date { get; set; }
    public int rating { get; set; }
}
