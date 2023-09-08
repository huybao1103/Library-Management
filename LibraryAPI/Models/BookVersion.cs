using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class BookVersion
{
    public Guid Id { get; set; }

    public int IdentifyId { get; set; }

    public byte Status { get; set; }

    public string? Description { get; set; }

    public Guid BookId { get; set; }

    public int? Version { get; set; }

    public virtual Book Book { get; set; } = null!;
}
