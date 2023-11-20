using LibraryAPI.ViewModels.Account;

namespace LibraryAPI.ViewModels.Employee
{
    public class EmployeeModel
    {
        public Guid? Id { get; set; }

        public string? Name { get; set; }

        public string? CitizenId { get; set; }

        public DateTime? BirthDate { get; set; }

        public DateTime? JoinDate { get; set; }

        public Guid? AccountId { get; set; }

        public virtual AccountModel? Account { get; set; }
    }
}
