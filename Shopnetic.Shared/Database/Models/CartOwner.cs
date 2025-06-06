namespace Shopnetic.Shared.Database
{
    public abstract class CartOwner
    {
        public int CartOwnerId { get; set; }
        public DateTime LastSeenAt { get; set; }
        public required string IPAddress { get; set; }
    }

    public class RegisteredCartOwner : CartOwner
    {
        public int UserId { get; set; }
    }

    public class AnonymousCartOwner : CartOwner
    {
        public required string UserSessionId { get; set; }
    }
}
