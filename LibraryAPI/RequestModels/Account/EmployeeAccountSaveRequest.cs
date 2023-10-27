namespace LibraryAPI.RequestModels.Account
{
    public class EmployeeAccountSaveRequest
    {
        public Guid? Id { get; set; }

        public string? Name { get; set; }

        public string? CitizenId { get; set; }

        public DateTime? BirthDate { get; set; }

        public DateTime? JoinDate { get; set; }

        public Guid? AccountId { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public Guid? RoleId { get; set; }
    }
}
