using LibraryAPI.Enums;
using LibraryAPI.Models;
using LibraryAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
                new Role { Name = "Admin" },
                new Role { Name = "Librarian" },
                new Role { Name = "Reader" },
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
