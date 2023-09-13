using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class UploadFile
{
    public Guid Id { get; set; }

    public string? FileName { get; set; }

    public virtual ICollection<BookImage> BookImages { get; set; } = new List<BookImage>();

    public virtual ICollection<StudentImage> StudentImages { get; set; } = new List<StudentImage>();
}
