using Microsoft.EntityFrameworkCore;

namespace Shopnetic.Shared.Database
{
    [Owned]
    public class ShippingAddress
    {
        public string FullName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string? Phone { get; set; }
    }
}