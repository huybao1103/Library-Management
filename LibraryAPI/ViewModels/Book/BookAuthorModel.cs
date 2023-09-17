using LibraryAPI.Models;
using LibraryAPI.ViewModels.Author;

namespace LibraryAPI.ViewModels.Book
{
    public class BookAuthorModel
    {
        public Guid Id { get; set; }

        public Guid AuthorId { get; set; }

        public Guid BookId { get; set; }
        public virtual AuthorModel Author { get; set; } = null!;

    }
}
