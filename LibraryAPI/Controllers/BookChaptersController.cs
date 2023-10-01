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
            }
            else
            {
                bookChapter = _mapper.Map<BookChapter>(bookChapterModel);
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

            _context.BookChapters.Remove(bookChapter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookChapterExists(Guid id)
        {
            return (_context.BookChapters?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private void RequestSaveChapterValidate(BookChapterModel bookChapterModel)
        {
            if(!bookChapterModel.Chapter.HasValue)
            {
                throw new CustomApiException(500, "Book Chapter number must not be null.", "Book Chapter number must not be null");
            }
            if (!bookChapterModel.Status.HasValue)
            {
                throw new CustomApiException(500, "Book Chapter status must not be null.", "Book Chapter status must not be null");
            }
            if (_context.BookChapters.Any(a => a.BookId == bookChapterModel.BookId && a.IdentifyId == bookChapterModel.IdentifyId))
            {
                throw new CustomApiException(500, "This book chapter Identify ID is existed.", "This book chapter Identify ID is existed.");
            }
            if (_context.BookChapters.Any(a => a.BookId == bookChapterModel.BookId && a.Chapter == bookChapterModel.Chapter))
            {
                throw new CustomApiException(500, "This book chapter number is existed.", "This book chapter number is existed.");
            }
        }
    }
}
