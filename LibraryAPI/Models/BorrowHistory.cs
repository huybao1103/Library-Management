using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BorrowHistory
{
    public Guid Id { get; set; }

    public DateTime? BorrowDate { get; set; }

    public DateTime? EndDate { get; set; }

    public byte? Status { get; set; }

    public Guid? BookId { get; set; }

    public Guid? StudentCardId { get; set; }

    public virtual Book? Book { get; set; }

    public virtual StudentCard? StudentCard { get; set; }
}
