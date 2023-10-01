using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BorrowHistory
{
    public Guid Id { get; set; }

    public DateTime? BorrowDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int? Status { get; set; }

    public Guid? BookId { get; set; }

    public Guid? LibraryCardId { get; set; }

    public virtual Book? Book { get; set; }

    public virtual LibraryCard? LibraryCard { get; set; }
}
