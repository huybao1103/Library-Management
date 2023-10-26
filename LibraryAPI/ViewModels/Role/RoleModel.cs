using LibraryAPI.Models;

namespace LibraryAPI.ViewModels.Role
{
    public class RoleModel
    {
        public Guid Id { get; set; }

        public string? Name { get; set; }

        public virtual ICollection<RoleModulePermissionModel> RoleModulePermissions { get; set; } = new List<RoleModulePermissionModel>();
    }
}
