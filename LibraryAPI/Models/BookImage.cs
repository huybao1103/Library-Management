using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BookImage
{
    public Guid Id { get; set; }

    public string? FilePath { get; set; }

    public Guid? FileId { get; set; }

    public Guid? BookId { get; set; }

    public string? Base64 { get; set; }

    public virtual Book? Book { get; set; }

    public virtual UploadFile? File { get; set; }
}
