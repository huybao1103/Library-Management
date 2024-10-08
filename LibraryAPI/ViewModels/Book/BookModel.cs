﻿using LibraryAPI.Models;

namespace LibraryAPI.ViewModels.Book
{
    public partial class BookModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string? PublishYear { get; set; }

        public DateTime? InputDay { get; set; }

        public virtual ICollection<BookAuthorModel> BookAuthors { get; set; } = new List<BookAuthorModel>();

        public virtual ICollection<BookCategoryModel> BookCategories { get; set; } = new List<BookCategoryModel>();

        public virtual ICollection<BookImageModel> BookImages { get; set; } = new List<BookImageModel>();

        public virtual ICollection<BookPublisherModel> BookPublishers { get; set; } = new List<BookPublisherModel>();

        public virtual ICollection<BookChapterModel> BookChapters { get; set; } = new List<BookChapterModel>();

        //public virtual ICollection<BorrowHistory> BorrowHistories { get; set; } = new List<BorrowHistory>();
    }
}
