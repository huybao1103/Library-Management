namespace LibraryAPI.RequestModels
{
    public class PublisherRequest
    {
        public Guid? Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Mail { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }
        public List<Guid>? BookPublisherId { get; set; }
    }
}
