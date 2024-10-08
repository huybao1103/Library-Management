﻿using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class Book
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? PublishYear { get; set; }

    public DateTime? InputDay { get; set; }

    public virtual ICollection<BookAuthor> BookAuthors { get; set; } = new List<BookAuthor>();

    public virtual ICollection<BookCategory> BookCategories { get; set; } = new List<BookCategory>();

    public virtual ICollection<BookChapter> BookChapters { get; set; } = new List<BookChapter>();

    public virtual ICollection<BookImage> BookImages { get; set; } = new List<BookImage>();

    public virtual ICollection<BookPublisher> BookPublishers { get; set; } = new List<BookPublisher>();
}
