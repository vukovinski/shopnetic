namespace Shopnetic.Shared.Database
{
    public class User
    {
        public int UserId { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset LastLoginAt { get; set; }
        public required string IPAddress { get; set; }
    }
}