using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class StudentImage
{
    public Guid Id { get; set; }

    public string? FilePath { get; set; }

    public Guid? FileId { get; set; }

    public Guid? LibraryCardId { get; set; }

    public string? Base64 { get; set; }

    public virtual UploadFile? File { get; set; }

    public virtual LibraryCard? LibraryCard { get; set; }
}
