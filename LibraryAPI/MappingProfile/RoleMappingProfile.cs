using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.Account;
using LibraryAPI.ViewModels.Role;

namespace LibraryAPI.MappingProfile
{
    public class RoleMappingProfile : Profile
    {
        public RoleMappingProfile()
        {
            CreateMap<Role, RoleModel>();
            CreateMap<RoleModel, Role>();

            CreateMap<RoleModulePermission, RoleModulePermissionModel>();
            CreateMap<RoleModulePermissionModel, RoleModulePermission>();
        }
    }
}
