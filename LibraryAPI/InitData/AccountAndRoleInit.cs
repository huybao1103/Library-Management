using LibraryAPI.Enums;
using LibraryAPI.Models;
using LibraryAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Extensions;
using System.Collections.Generic;

namespace LibraryAPI.InitData
{
    public class AccountAndRoleInit
    {
        private static LibraryManagementContext _context = new LibraryManagementContext();
        private static HashService _hashService = new HashService();
        public AccountAndRoleInit()
        {
            InitData();
        }

        public static async void InitData()
        {
            List<Role> roleList;
            if (_context.Roles.IsNullOrEmpty())
            {
                roleList = await CreateRole();
                await CreateRoleModulePermission(roleList);
                await CreateAccount(roleList);
            }
            await _context.SaveChangesAsync();
        }

        private static async Task<List<Role>> CreateRole()
        {
            List<Role> roleList = new List<Role>
            {
                new Role { Name = DefaultRoleEnum.Admin.GetDisplayName(), NormalizedName = DefaultRoleEnum.Admin.GetDisplayName().ToLower() },
                new Role { Name = DefaultRoleEnum.Librarian.GetDisplayName(), NormalizedName = DefaultRoleEnum.Librarian.GetDisplayName().ToLower() },
                new Role { Name = DefaultRoleEnum.Reader.GetDisplayName(), NormalizedName = DefaultRoleEnum.Reader.GetDisplayName().ToLower() },
            };
            await _context.Roles.AddRangeAsync(roleList);
            await _context.SaveChangesAsync();
            return roleList;
        }

        private static async Task CreateRoleModulePermission(List<Role> roleList)
        {
            List<ModuleEnum> adminModuleEnums = new List<ModuleEnum>
            {
                ModuleEnum.AccountManagement,
                ModuleEnum.EmployeeManagement,
                ModuleEnum.ReaderAccountManagement,
                ModuleEnum.RolePermissionManagement
            }; 
            List<ModuleEnum> readerModuleEnums = new List<ModuleEnum>
            {
                ModuleEnum.BookSearch,
                ModuleEnum.BookCategory,
            };

            List<RoleModulePermission> permissions = new List<RoleModulePermission>();
            for(int i = 0; i < roleList.Count; i++)
            {
                bool permitted = false;
                foreach (int item in Enum.GetValues(typeof(ModuleEnum)))
                {
                    switch (i)
                    {
                        case 0: // Admin 
                            permitted = true;
                            break;
                        case 1: // Librarian
                            permitted =
                            adminModuleEnums.Contains((ModuleEnum)item)
                            ||
                            readerModuleEnums.Contains((ModuleEnum)item)
                            ? false : true;
                            break;
                    }
                    permissions.Add(new RoleModulePermission
                    {
                        Module = item,
                        Access = permitted,
                        Delete = permitted,
                        Create = permitted,
                        Detail = permitted,
                        Edit = permitted,
                        RoleId = roleList[i].Id
                    });
                }
            }
            await _context.RoleModulePermissions.AddRangeAsync(permissions);
        }

        private static async Task CreateAccount(List<Role> roleList)
        {
            List<Account> accountList = new List<Account>
            {
                new Account
                {
                    Email = "admin@gmail.com",
                    PasswordHash = _hashService.ConvertStringToHash("admin123"),
                    RoleId = roleList[0].Id
                },
                new Account
                {
                    Email = "bao@gmail.com",
                    PasswordHash = _hashService.ConvertStringToHash("bao123"),
                    RoleId = roleList[1].Id
                },
                new Account
                {
                    Email = "baosv@gmail.com",
                    PasswordHash = _hashService.ConvertStringToHash("bao123"),
                    RoleId = roleList[2].Id
                },
            };
            await _context.Accounts.AddRangeAsync(accountList);
        }
    }
}
