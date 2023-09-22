namespace LibraryAPI.ViewModels.Publisher
{
    public class PublisherModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Mail { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }
    }
}
