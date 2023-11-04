using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class Employee
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? CitizenId { get; set; }

    public DateTime? BirthDate { get; set; }

    public Guid? AccountId { get; set; }

    public DateTime? JoinDate { get; set; }
}
