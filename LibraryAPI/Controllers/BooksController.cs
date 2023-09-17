
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using LibraryAPI.PubSub;
using LibraryAPI.RequestModels;
using LibraryAPI.CustomException;
using AutoMapper;
using LibraryAPI.ViewModels.Book;

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
                ));
        }

        // GET: api/Books/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<Book>> GetBook(Guid id)
        {
          if (_context.Books == null)
          {
              return NotFound();
          }
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("save")]
        [PubSub(PubSubConstas.AUTHOR_INFO)]
        public async Task<ActionResult<Book>> PostBook(BookRequest bookModel)
        {
            if (_context.Books == null)
            {
                return Problem("Entity set 'LibraryManagementContext.Books'  is null.");
            }
            RequestSaveBookValidate(bookModel);

            Book book = _mapper.Map<Book>(bookModel);

            if (bookModel.Id == Guid.Empty)
            {
                book.BookAuthors = await UpdateBookAuthorAsync(book, bookModel);
                book.BookCategories = await UpdateBookCategoriesAsync(book, bookModel);
                book.BookPublishers = await UpdateBookPublishersAsync(book, bookModel);
                _context.Books.Add(book);
            }   
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
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
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

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

        private async Task<ICollection<BookAuthor>> UpdateBookAuthorAsync(Book book, BookRequest bookModel)
        {
            var bookAuthors = bookModel.Authors?.Select(authorId => new BookAuthor
            {
                AuthorId = authorId,
                BookId = book.Id
            }).ToList();
            return bookAuthors;
        }

        private async Task<ICollection<BookPublisher>> UpdateBookPublishersAsync(Book book, BookRequest bookModel)
        {
            var bookPublishers = bookModel.Publishers?.Select(publisherId => new BookPublisher
            {
                PublisherId = publisherId,
                BookId = book.Id
            }).ToList();
            return bookPublishers;
        }

        private async Task<ICollection<BookCategory>> UpdateBookCategoriesAsync(Book book, BookRequest bookModel)
        {
            var bookCategories = bookModel.Categories?.Select(categoryId => new BookCategory
            {
                CategoryId = categoryId,
                BookId = book.Id
            }).ToList();
            return bookCategories;
        }
    }
}
