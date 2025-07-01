namespace Shopnetic.Shared.Database
{
    public class ProductImage
    {
        public int ProductImageId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public bool IsPrimary { get; set; }
        public required byte[] ImageData { get; set; }
        public required string ImageMimeType { get; set; }
    }
}