namespace LibraryAPI.RequestModels
{
    public class CategoryRequest
    {
        public Guid? Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

    }
}
