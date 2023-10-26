using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class Account
{
    public Guid Id { get; set; }

    public string? Email { get; set; }

    public string? PasswordHash { get; set; }

    public Guid? RoleId { get; set; }

    public virtual Role? Role { get; set; }
}
