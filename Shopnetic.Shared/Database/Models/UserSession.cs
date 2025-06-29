namespace Shopnetic.Shared.Database
{
    public class UserSession
    {
        public Guid UserSessionId { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public required string IPAddress { get; set; }
        public required string UserAgent { get; set; }
        public DateTimeOffset? LastActivity { get; set; } = null;
        public DateTimeOffset? RevokedAt { get; set; } = null;
        public string? RevocationReason { get; set; } = null;
        public int? UserId { get; set; } = null;
        public User? User { get; set; } = null;
        public string? RefreshTokenHash { get; set; } = null;
        public DateTimeOffset? ExpiresAt { get; set; } = null;
    }
}