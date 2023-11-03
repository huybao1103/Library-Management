using LibraryAPI.ViewModels.Account;

namespace LibraryAPI.ViewModels.Employee
{
    public class EmployeeAccountList
    {
        public virtual EmployeeModel? Employee { get; set; }
        public virtual AccountModel? Account { get; set; }
    }
}
