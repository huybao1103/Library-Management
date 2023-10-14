using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BorrowHistory
{
    public Guid Id { get; set; }

    public DateTime? BorrowDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int? Status { get; set; }

    public Guid? BookChapterId { get; set; }

    public Guid? LibraryCardId { get; set; }

    public DateTime? LostOrDestroyedDate { get; set; }

    public virtual BookChapter? BookChapter { get; set; }

    public virtual LibraryCard? LibraryCard { get; set; }
}
