namespace LibraryAPI.RequestModels
{
    public class BookRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? PublishYear { get; set; }
        public Guid Category { get; set; }
        public DateTime? InputDay { get; set; }
        public List<Guid>? Authors { get; set; }
        public List<Guid>? Publishers { get; set; }
        public List<Guid>? Categories { get; set; }
    }
}
