namespace LibraryAPI.ViewModels.Author
{
    public class AuthorModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Mail { get; set; }

        public string? Phone { get; set; }
    }
}
