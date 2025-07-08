namespace Shopnetic.Shared.Database
{
    public class ProductReview
    {
        public int ProductReviewId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public required string ReviewerName { get; set; }
        public required string ReviewText { get; set; }
        public DateTime ReviewDate { get; set; }
        public int ReviewRating { get; set; }
    }
}