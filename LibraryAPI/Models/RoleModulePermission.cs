using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class RoleModulePermission
{
    public Guid Id { get; set; }

    public int? Module { get; set; }

    public bool? Access { get; set; }

    public bool? Detail { get; set; }

    public bool? Create { get; set; }

    public bool? Edit { get; set; }

    public bool? Delete { get; set; }

    public Guid? RoleId { get; set; }

    public virtual Role? Role { get; set; }
}
