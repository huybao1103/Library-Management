using LibraryAPI.Enums;

namespace LibraryAPI.ViewModels.Book
{
    public class BookChapterModel
    {
        public Guid? Id { get; set; }

        public string? IdentifyId { get; set; }

        public BookChapterStatusEnum? Status { get; set; }

        public string? Description { get; set; }

        public Guid? BookId { get; set; }

        public int? Chapter { get; set; }
    }
}
