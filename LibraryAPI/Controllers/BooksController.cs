
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using LibraryAPI.PubSub;
using LibraryAPI.RequestModels;
using LibraryAPI.CustomException;
using AutoMapper;
using LibraryAPI.ViewModels.Book;
using LibraryAPI.ViewModels.File;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly IMapper _mapper;

        public BooksController(
            LibraryManagementContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Books
        [HttpGet]
        [PubSub(PubSubConstas.AUTHOR_INFO)]
        public async Task<ActionResult<IEnumerable<BookModel>>> GetBooks()
        {
            return Ok(_mapper.Map<List<BookModel>>
                (
                     _context.Books
                    .Include(a => a.BookAuthors)
                        .ThenInclude(a => a.Author)
                    .Include(a => a.BookImages)
                        .ThenInclude(a => a.File)
                    .Include(a => a.BookCategories)
                        .ThenInclude(a => a.Category)
                ));
        }

        // GET: api/Books/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<BookModel>> GetBook(Guid id)
        {
          if (_context.Books == null)
          {
              return NotFound();
          }
            var book = GetBookByIdAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<BookModel>(book));
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("save")]
        [PubSub(PubSubConstas.AUTHOR_INFO)]
        public async Task<ActionResult<BookModel>> PostBook(BookRequest bookModel)
        {
            if (_context.Books == null)
            {
                return Problem("Entity set 'LibraryManagementContext.Books'  is null.");
            }
            RequestSaveBookValidate(bookModel);

            Book? book;
            if (bookModel.Id == Guid.Empty)
            {
                book = _mapper.Map<Book>(bookModel);

                book.BookAuthors = await AddBookAuthorAsync(book, bookModel);
                book.BookCategories = await AddBookCategoriesAsync(book, bookModel);
                book.BookPublishers = await AddBookPublishersAsync(book, bookModel);
                //book.BookImages = await UpdateBookImagesAsync(book, bookModel);

                _context.Books.Add(book);
                //book = newBook;
            }   
            else
            {
                book = GetBookByIdAsync(bookModel.Id);

                await UpdateBookRequest(book, bookModel);
                book = _mapper.Map(bookModel, book);
                //book = existingBook;
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, _mapper.Map<BookModel>(book));
        }

        // DELETE: api/Books/5
        [HttpDelete("delete/{id}")]
        [PubSub(PubSubConstas.AUTHOR_INFO)]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            var book = GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            // Refactor later
            book.BookPublishers.Clear();
            book.BookAuthors.Clear();
            book.BookImages.Clear();
            book.BookCategories.Clear();
            book.BookVersions.Clear();

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Books
        [HttpGet("option")]
        [PubSub(PubSubConstas.AUTHOR_INFO)]
        public async Task<ActionResult<IEnumerable<Option>>> GetBooksOption()
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            var bookList = await _context.Books.ToListAsync(); // Get book list

            return bookList.Select(book => new Option { Value = book.Id, Label = book.Name }).ToList(); // Get book option list
        }

        private bool BookExists(Guid id)
        {
            return (_context.Books?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private void RequestSaveBookValidate(BookRequest bookModel)
        {
            if (_context.Books.Any(a => a.Name == bookModel.Name && a.Id != bookModel.Id))
            {
                throw new CustomApiException(500, "This book name is existed.", "This book name is existed.");
            }
        }

        private Task<ICollection<BookAuthor>> AddBookAuthorAsync(Book book, BookRequest bookModel)
        {
            var bookAuthors = bookModel.Authors?.Select(authorId => new BookAuthor
            {
                AuthorId = authorId,
                BookId = book.Id
            }).ToList();
            return Task.FromResult<ICollection<BookAuthor>>(bookAuthors);
        }

        private Task<ICollection<BookPublisher>> AddBookPublishersAsync(Book book, BookRequest bookModel)
        {
            var bookPublishers = bookModel.Publishers?.Select(publisherId => new BookPublisher
            {
                PublisherId = publisherId,
                BookId = book.Id
            }).ToList();
            return Task.FromResult<ICollection<BookPublisher>>(bookPublishers);
        }

        private Task<ICollection<BookCategory>> AddBookCategoriesAsync(Book book, BookRequest bookModel)
        {
            var bookCategories = bookModel.Categories?.Select(categoryId => new BookCategory
            {
                CategoryId = categoryId,
                BookId = book.Id
            }).ToList();
            return Task.FromResult<ICollection<BookCategory>>(bookCategories);
        }

        //private async Task<ICollection<BookImage>> UpdateBookImagesAsync(Book book, BookRequest bookModel)
        //{
        //    ICollection<BookImage>? bookImages = null;
        //    foreach (BookImageModel fileModel in bookModel.BookImages)
        //    {
        //        UploadFile file = _mapper.Map<UploadFileModel, UploadFile>(fileModel.File);
        //        _context.UploadFiles.Add(file);
        //    }
        //    return bookImages;
        //}

        private async Task<Book> UpdateBookRequest(Book book, BookRequest bookModel)
        {
            if(book.BookCategories.Count > 0)
            {
                book.BookCategories.Clear();
            }
            book.BookCategories = await AddBookCategoriesAsync(book, bookModel);

            if(book.BookAuthors.Count > 0)
            {
                book.BookAuthors.Clear();
            }
            book.BookAuthors = await AddBookAuthorAsync(book, bookModel);

            if(book.BookPublishers.Count > 0)
            {
                book.BookPublishers.Clear();
            }
            book.BookPublishers = await AddBookPublishersAsync(book, bookModel);

            if(book.BookImages.Count > 0)
            {
                book.BookImages.Clear();
            }

            return book;
        }

        private Book? GetBookByIdAsync(Guid bookId)
        {
            return _context.Books
                .Include(a => a.BookAuthors)
                    .ThenInclude(a => a.Author)
                .Include(a => a.BookImages)
                    .ThenInclude(a => a.File)
                .Include(a => a.BookCategories)
                    .ThenInclude(a => a.Category)
            .FirstOrDefault(book => book.Id == bookId);
        }
    }
}
