namespace Shopnetic.Admin.Dto;

public class ProductDto
{
    public int id { get; set; }
    public string name { get; set; }
    public string description { get; set; }
    public CategoryDto category { get; set; }
    public PriceDto currentPrice { get; set; }
    public InventoryDto inventory { get; set; }
    public ProductStatus status { get; set; }
    public string sku { get; set; }
    public List<ImageDto> images { get; set; }
}
