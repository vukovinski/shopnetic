namespace Shopnetic.Shared.Database
{
    public class Category
    {
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }
        public required byte[] CategoryImageData { get; set; }
        public required string CategoryImageMimeType { get; set; }
    }
}