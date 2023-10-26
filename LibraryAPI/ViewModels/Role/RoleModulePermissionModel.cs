namespace LibraryAPI.ViewModels.Role
{
    public class RoleModulePermissionModel
    {
        public Guid Id { get; set; }

        public int? Module { get; set; }

        public bool? Access { get; set; }

        public bool? Detail { get; set; }

        public bool? Create { get; set; }

        public bool? Edit { get; set; }

        public bool? Delete { get; set; }

        public Guid? RoleId { get; set; }
    }
}
