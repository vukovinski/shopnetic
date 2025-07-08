namespace Shopnetic.Web.Dto
{
    public class CategoryDto
    {
        public int id { get; set; }
        public int productCount { get; set; }
        public required string name { get; set; }
        public required string image { get; set; }
    }
}
