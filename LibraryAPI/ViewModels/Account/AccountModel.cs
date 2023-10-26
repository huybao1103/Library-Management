using LibraryAPI.Models;
using LibraryAPI.ViewModels.Role;

namespace LibraryAPI.ViewModels.Account
{
    public class AccountModel
    {
        public Guid Id { get; set; }

        public string? Email { get; set; }

        public Guid? RoleId { get; set; }

        public virtual RoleModel? Role { get; set; }
    }
}
