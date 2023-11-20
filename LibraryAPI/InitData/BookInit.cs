using LibraryAPI.CustomException;
using LibraryAPI.Models;
using LibraryAPI.Services;
using LibraryAPI.ViewModels.Menu;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace LibraryAPI.InitData
{
    public class BookInit
    {
        private static LibraryManagementContext _context = new LibraryManagementContext();
        private static HashService _hashService = new HashService();
        private static IWebHostEnvironment _webHostEnvironment;
        private static List<Book> book = new List<Book>();
        private static List<Category> category = new List<Category>();
        private static List<Author> author = new List<Author>();
        private static List<BookCategory> bookCategory = new List<BookCategory>();
        private static List<BookAuthor> bookAuthor = new List<BookAuthor>();
        private static List<BookChapter> bookChapter = new List<BookChapter>();
        private static List<Publisher> publisher = new List<Publisher>();
        private static List<BookPublisher> bookPublisher = new List<BookPublisher>();

        public BookInit(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            InitData();
        }

        private static async void InitData()
        {
            if (_context.Books.IsNullOrEmpty())
            {
                CreateBook();
            }
            //await _context.SaveChangesAsync();
        }

        private static async void CreateBook()
        {
            GetBookFromJSON();
            GetCategoryFromJSON();
            GetAuthorFromJSON();
            GetBookCategoryFromJSON();
            GetBookAuthorFromJSON();
            GetBookChapterFromJSON();
            GetPublisherFromJSON();
            GetBookPublisherFromJSON();
            await AddDB();
        }

        private static async Task<int> AddDB()
        {
            await _context.Books.AddRangeAsync(book);
            await _context.Categories.AddRangeAsync(category);
            await _context.Authors.AddRangeAsync(author);
            await _context.Publishers.AddRangeAsync(publisher);
            await _context.BookCategories.AddRangeAsync(bookCategory);
            await _context.BookAuthors.AddRangeAsync(bookAuthor);
            await _context.BookChapters.AddRangeAsync(bookChapter);
            await _context.BookPublishers.AddRangeAsync(bookPublisher);
            return await _context.SaveChangesAsync();
        }

        private static void GetBookFromJSON()
        {
            string fileName = "Books.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Books/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get books", "Cannot get books");
            }

            book = JsonConvert.DeserializeObject<List<Book>>(jsonData);
        }
        private static void GetCategoryFromJSON()
        {
            string fileName = "Categories.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Books/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get categories", "Cannot get categories");
            }

            category = JsonConvert.DeserializeObject<List<Category>>(jsonData);
        }
        private static void GetAuthorFromJSON()
        {
            string fileName = "Authors.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Books/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get authors", "Cannot get authors");
            }

            author = JsonConvert.DeserializeObject<List<Author>>(jsonData);
        }
        private static void GetBookCategoryFromJSON()
        {
            string fileName = "BookCategory.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Books/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get bookcategories", "Cannot get bookcategories");
            }

            bookCategory = JsonConvert.DeserializeObject<List<BookCategory>>(jsonData);
        }
        private static void GetBookAuthorFromJSON()
        {
            string fileName = "BookAuthor.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Books/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get bookauthors", "Cannot get bookauthors");
            }

            bookAuthor = JsonConvert.DeserializeObject<List<BookAuthor>>(jsonData);
        }
        private static void GetBookChapterFromJSON()
        {
            string fileName = "BookChapter.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Books/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get bookchapters", "Cannot get bookchapters");
            }

            bookChapter = JsonConvert.DeserializeObject<List<BookChapter>>(jsonData);
        }
        private static void GetPublisherFromJSON()
        {
            string fileName = "Publishers.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Books/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get publishers", "Cannot get publishers");
            }

            publisher = JsonConvert.DeserializeObject<List<Publisher>>(jsonData);
        }
        private static void GetBookPublisherFromJSON()
        {
            string fileName = "BookPublisher.json";

            var rootPath = _webHostEnvironment.ContentRootPath;

            var fullPath = Path.Combine(rootPath, $"GoldenData/Books/{fileName}");

            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (jsonData == null)
            {
                throw new CustomApiException(500, "Cannot get BookPublishers", "Cannot get BookPublishers");
            }

            bookPublisher = JsonConvert.DeserializeObject<List<BookPublisher>>(jsonData);
        }
    }
}
