using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using AutoMapper;
using LibraryAPI.ViewModels.Book;
using LibraryAPI.CustomException;
using LibraryAPI.RequestModels;
using LibraryAPI.PubSub;
using LibraryAPI.Enums;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookChaptersController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly IMapper _mapper;

        public BookChaptersController(LibraryManagementContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/BookChapters/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<BookChapterModel>> GetBookChapter(Guid id)
        {
          if (_context.BookChapters == null)
          {
              return NotFound();
          }
            var bookChapter = await _context.BookChapters.FindAsync(id);

            if (bookChapter == null)
            {
                return NotFound();
            }

            return _mapper.Map<BookChapterModel>(bookChapter);
        }

        // POST: api/BookChapters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("save")]
        public async Task<ActionResult<BookChapterModel>> PostBookChapter(BookChapterModel bookChapterModel)
        {
          if (_context.BookChapters == null)
          {
              return Problem("Entity set 'LibraryManagementContext.BookChapters'  is null.");
          }
            RequestSaveChapterValidate(bookChapterModel);
            BookChapter? bookChapter;
            if(bookChapterModel.Id.HasValue)
            {
                bookChapter = _context.BookChapters.First(chap => chap.Id == bookChapterModel.Id);
                bookChapter = _mapper.Map(bookChapterModel, bookChapter);

                //if (bookChapter.Status == (int)BookChapterStatusEnum.Destroyed || bookChapter.Status == (int)BookChapterStatusEnum.Lost)
                //{
                //    bookChapter.LostOrDestroyedDate = DateTime.UtcNow;
                //}
            }
            else
            {
                bookChapter = _mapper.Map<BookChapter>(bookChapterModel);
                //if (bookChapter.Status == (int)BookChapterStatusEnum.Destroyed || bookChapter.Status == (int)BookChapterStatusEnum.Lost)
                //{
                //    bookChapter.LostOrDestroyedDate = DateTime.UtcNow;
                //}
                _context.BookChapters.Add(bookChapter);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookChapter", new { id = bookChapter.Id }, _mapper.Map<BookChapterModel>(bookChapter));
        }

        [HttpPost("get-book-chapter")]
        public async Task<ActionResult<IEnumerable<BookChapterModel>>> GetBookChapterByBookId(Guid? bookId)
        {
            if(!bookId.HasValue)
                throw new CustomApiException(500, "Need book ID to get Its chapters.", "Need book ID to get Its chapters.");

            var result = await _context.BookChapters.Where(chap => chap.BookId == bookId).ToListAsync();

            return Ok(_mapper.Map<List<BookChapterModel>>(result));
        }

        // DELETE: api/BookChapters/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBookChapter(Guid id)
        {
            if (_context.BookChapters == null)
            {
                return NotFound();
            }
            var bookChapter = await _context.BookChapters.FindAsync(id);
            if (bookChapter == null)
            {
                return NotFound();
            }

            var historyRecords = await _context.BorrowHistories.Where(bh => bh.BookChapterId == id).ToListAsync();
            _context.BorrowHistories.RemoveRange(historyRecords);

            _context.BookChapters.Remove(bookChapter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("option/{bookId}")]
        [PubSub(PubSubConstas.AUTHOR_INFO)]
        public async Task<ActionResult<IEnumerable<Option>>> GetBooksOption(Guid bookId)
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            var bookList = await _context.BookChapters
                .Where
                (
                    x => x.BookId == bookId
                    && x.Quantity > 0
                )
                .ToListAsync(); // Get book list

            return bookList.Select(book => new Option { Value = book.Id, Label = book.Chapter.ToString() }).ToList(); // Get book option list
        }

        // GET: api/BookChapters/5
        [HttpGet("get-statistic")]
        public async Task<ActionResult<List<BookChapterModel>>> GetBookChapterStatistic()
        {
            if (_context.BookChapters == null)
            {
                return NotFound();
            }
            var query = GetAllBookChapters();

            query = query.Where(chapter => chapter.Book.InputDay.HasValue && chapter.Book.InputDay.Value.Year == DateTime.Today.Year);

            return _mapper.Map<List<BookChapterModel>>(await query.ToListAsync());
        }

        [HttpPost("check-remove-cart-item")]
        public async Task<List<Guid>> CheckStatusToRemoveCartItem(List<Guid> ids)
        {
            List<BookChapter> allBookChapter = GetAllBookChapters().ToList();

            List<Guid> chapterIdToBeRemove = new List<Guid>();

            foreach(Guid id in ids)
            {
                BookChapter bookChapter = allBookChapter.FirstOrDefault(chapter => chapter.Id == id);
                if (
                    bookChapter.Quantity <= 0
                ) {
                    chapterIdToBeRemove.Add(id);
                }
            }
            return chapterIdToBeRemove;
        }
        private bool BookChapterExists(Guid id)
        {
            return (_context.BookChapters?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private void RequestSaveChapterValidate(BookChapterModel bookChapterModel)
        {
            BookChapter bookChapter = _mapper.Map<BookChapter>(bookChapterModel);

            if (!bookChapter.BookId.HasValue)
            {
                throw new CustomApiException(500, "Book ID must not be null.", "Book ID must not be null");
            }
            if (!bookChapter.Chapter.HasValue)
            {
                throw new CustomApiException(500, "Book Chapter number must not be null.", "Book Chapter number must not be null");
            }
            //if (_context.BookChapters.Any(a => a.BookId == bookChapter.BookId && a.Id != bookChapter.Id && a.IdentifyId == bookChapter.IdentifyId))
            //{
            //    throw new CustomApiException(500, "This book chapter Identify ID is existed.", "This book chapter Identify ID is existed.");
            //}
            if (_context.BookChapters.Any(a => a.BookId == bookChapter.BookId && a.Id != bookChapter.Id && a.Chapter == bookChapter.Chapter))
            {
                throw new CustomApiException(500, "This book chapter number is existed.", "This book chapter number is existed.");
            }
        }
    
        private IQueryable<BookChapter> GetAllBookChapters()
        {
            return _context.BookChapters
                .Include(x => x.Book)
                .AsQueryable();
        }
    }
}
