using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BookCategory
{
    public Guid Id { get; set; }

    public Guid? CategoryId { get; set; }

    public Guid? BookId { get; set; }

    public virtual Book? Book { get; set; }

    public virtual Category? Category { get; set; }
}
