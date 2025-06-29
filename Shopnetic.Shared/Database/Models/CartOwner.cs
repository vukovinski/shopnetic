namespace Shopnetic.Shared.Database
{
    public abstract class CartOwner
    {
        public int CartOwnerId { get; set; }
        public DateTimeOffset LastSeenAt { get; set; }
        public required string IPAddress { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }

    public class RegisteredCartOwner : CartOwner
    {
        public int UserId { get; set; }
        public required User User { get; set; }
    }

    public class AnonymousCartOwner : CartOwner
    {
        public required Guid UserSessionId { get; set; }
        public required UserSession UserSession { get; set; }
    }
}
