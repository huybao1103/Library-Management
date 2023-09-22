using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BookPublisher
{
    public Guid Id { get; set; }

    public Guid? PublisherId { get; set; }

    public Guid? BookId { get; set; }

    public virtual Book? Book { get; set; }

    public virtual Publisher? Publisher { get; set; }
}
