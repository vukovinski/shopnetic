namespace Shopnetic.Shared.Database
{
    public class DiscountCode
    {
        public int DiscountCodeId { get; set; }
        public required string Code { get; set; }
        public required string Description { get; set; }
        public required DateTime EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public Product? Product { get; set; } = null;
        public int? ProductId { get; set; } = null;
    }
}