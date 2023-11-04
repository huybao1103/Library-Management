using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class Role
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? NormalizedName { get; set; }

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();

    public virtual ICollection<RoleModulePermission> RoleModulePermissions { get; set; } = new List<RoleModulePermission>();
}
