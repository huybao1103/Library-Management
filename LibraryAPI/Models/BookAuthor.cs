using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BookAuthor
{
    public Guid Id { get; set; }

    public Guid? AuthorId { get; set; }

    public Guid? BookId { get; set; }

    public virtual Author Author { get; set; } = null!;

    public virtual Book Book { get; set; } = null!;
}
