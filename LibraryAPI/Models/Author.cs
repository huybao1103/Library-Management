using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class Author
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Mail { get; set; }

    public string? Phone { get; set; }

    public virtual ICollection<BookAuthor> BookAuthors { get; set; } = new List<BookAuthor>();
}
