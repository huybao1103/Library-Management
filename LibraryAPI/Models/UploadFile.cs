using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class UploadFile
{
    public Guid Id { get; set; }

    public string? FileName { get; set; }

    public string? FilePath { get; set; }

    public Guid BookId { get; set; }

    public virtual Book Book { get; set; } = null!;
}
