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
            List<RoleModulePermission> permissions = new List<RoleModulePermission>();
            foreach (int item in Enum.GetValues(typeof(AdminModuleEnum)))
            {
                permissions.Add(new RoleModulePermission
                {
                    Module = item,
                    Access = true,
                    Delete = true,
                    Create = true,
                    Detail = true,
                    Edit = true,
                    RoleId = roleList[0].Id
                });
            }
            foreach (int item in Enum.GetValues(typeof(AdminModuleEnum)))
            {
                if (
                    item == (int)AdminModuleEnum.AccountManagement
                    || item == (int)AdminModuleEnum.EmployeeManagement
                    || item == (int)AdminModuleEnum.ReaderAccountManagement
                    || item == (int)AdminModuleEnum.RolePermissionManagement
                ) {
                    permissions.Add(new RoleModulePermission
                    {
                        Module = item,
                        Access = false,
                        Delete = false,
                        Create = false,
                        Detail = false,
                        Edit = false,
                        RoleId = roleList[1].Id
                    });
                    continue;
                }
                permissions.Add(new RoleModulePermission
                {
                    Module = item,
                    Access = true,
                    Delete = true,
                    Create = true,
                    Detail = true,
                    Edit = true,
                    RoleId = roleList[1].Id
                });
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
