using LibraryAPI.ViewModels.Author;

namespace LibraryAPI.ViewModels.Book
{
    public class BookCategoryModel
    {
        public Guid Id { get; set; }

        public Guid CategoryId { get; set; }

        public Guid BookId { get; set; }
        public virtual CategoryModel Category { get; set; } = null!;
    }
}
