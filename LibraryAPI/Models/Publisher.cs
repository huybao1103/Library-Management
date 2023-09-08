using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class Publisher
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Mail { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<BookPublisher> BookPublishers { get; set; } = new List<BookPublisher>();
}
