using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BookChapter
{
    public Guid Id { get; set; }

    public string? IdentifyId { get; set; }

    public int? Status { get; set; }

    public string? Description { get; set; }

    public Guid? BookId { get; set; }

    public int? Chapter { get; set; }

    public virtual Book? Book { get; set; }
}
