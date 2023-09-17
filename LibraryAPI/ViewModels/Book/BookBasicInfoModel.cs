namespace LibraryAPI.ViewModels.Book
{
    public class BookBasicInfoModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string? PublishYear { get; set; }

        public DateTime? InputDay { get; set; }
    }
}
