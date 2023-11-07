using LibraryAPI.CustomException;
using LibraryAPI.Models;
using LibraryAPI.Services;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Security.Policy;

namespace LibraryAPI.InitData
{
    public class AccountAndLibraryCardInit
    {
        private static LibraryManagementContext _context = new LibraryManagementContext();
        private static HashService _hashService = new HashService();
        private static IWebHostEnvironment _webHostEnvironment;
        private static List<LibraryCard> libraryCard = new List<LibraryCard>();
        private static List<Account> account = new List<Account>();
        private static List<Employee> employee = new List<Employee>();

        public AccountAndLibraryCardInit(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            InitData();
        }
        private static async void InitData()
        {
            if (_context.LibraryCards.IsNullOrEmpty() || _context.Employees.IsNullOrEmpty())
            {
                CreateData();
            }
        }
        private static async void CreateData()
        {
            GetAccountJSON();
            GetLibraryCardJSON();
            GetEmployeeJSON();
            await AddDB();
        }
        private static async Task<int> AddDB()
        {
            await _context.LibraryCards.AddRangeAsync(libraryCard);
            await _context.Accounts.AddRangeAsync(account);
            await _context.Employees.AddRangeAsync(employee);
            return await _context.SaveChangesAsync();
        }
        private static void GetLibraryCardJSON()
        {
            string fileName = "LibraryCards.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Accounts/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get library cards", "Cannot get library cards");
            }

            libraryCard = JsonConvert.DeserializeObject<List<LibraryCard>>(jsonData);
        }
        private static void GetAccountJSON()
        {
            string fileName = "Accounts.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Accounts/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get accounts", "Cannot get accounts");
            }

            account = JsonConvert.DeserializeObject<List<Account>>(jsonData);
        }
        private static void GetEmployeeJSON()
        {
            string fileName = "Employees.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Accounts/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get employees", "Cannot get employees");
            }

            employee = JsonConvert.DeserializeObject<List<Employee>>(jsonData);
        }
    }
}
