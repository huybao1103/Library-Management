using LibraryAPI.CustomException;
using LibraryAPI.Enums;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.Account;
using LibraryAPI.ViewModels.Menu;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly LibraryManagementContext _context;
        public DataController(IWebHostEnvironment webHostEnvironment, LibraryManagementContext context)
        {
            _webHostEnvironment = webHostEnvironment;
            _context = context;
        }

        [HttpGet("menu/{loggedInAccountId}")]
        public List<MenuModel> GetMenu(Guid? loggedInAccountId)
        {
            string fileName = "AdminMenu.json";

            if(loggedInAccountId.HasValue)
            {
                Account? account = _context.Accounts
                    .Include(x => x.Role)
                        .ThenInclude(x => x.RoleModulePermissions)
                    .First(a => a.Id == loggedInAccountId);

                if (account == null)
                {
                    throw new CustomApiException(500, "Cannot find this account, may be it was deleted.", "Cannot find this account, may be it was deleted.");
                }

                fileName = account.Role.Name.Equals("Reader")
                    ? "ReaderMenu.json"
                    : "AdminMenu.json";
            }

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Menu/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if(jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get menu", "Cannot get menu");
            }
            
            return JsonConvert.DeserializeObject<List<MenuModel>>(jsonData);
        }
    }
}
