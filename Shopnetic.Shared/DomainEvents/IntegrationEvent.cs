namespace Shopnetic.Shared.DomainEvents;

public class IntegrationEvent<TPayload>
{
    public Guid EventId { get; set; } = Guid.CreateVersion7();
    public string EventType { get; set; } = default!;
    public int EventVersion { get; set; } = 1;
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;
    public string Source { get; set; } = default!;
    public string CorrelationId { get; set; } = default!;
    public TPayload Payload { get; set; } = default!;
}
