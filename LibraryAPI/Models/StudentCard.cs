using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class StudentCard
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Class { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public byte? Status { get; set; }

    public string? Description { get; set; }

    public Guid StudentId { get; set; }

    public virtual ICollection<BorrowHistory> BorrowHistories { get; set; } = new List<BorrowHistory>();

    public virtual ICollection<StudentImage> StudentImages { get; set; } = new List<StudentImage>();
}
