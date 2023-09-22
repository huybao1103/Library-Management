using LibraryAPI.ViewModels.Author;
using LibraryAPI.ViewModels.Publisher;

namespace LibraryAPI.ViewModels.Book
{
    public class BookPublisherModel
    {
        public Guid Id { get; set; }

        public Guid PublisherId { get; set; }

        public Guid BookId { get; set; }
        public virtual PublisherModel Publisher { get; set; } = null!;
    }
}
