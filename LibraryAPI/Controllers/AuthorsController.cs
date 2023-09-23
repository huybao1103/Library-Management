using AutoMapper;
using LibraryAPI.CustomException;
using LibraryAPI.Models;
using LibraryAPI.PubSub;
using LibraryAPI.RequestModels;
using LibraryAPI.ViewModels.Author;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorsController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly IMapper _mapper;

        public AuthorsController(
            LibraryManagementContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Authors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthorModel>>> GetAuthors()
        {
            var temp = await _context.Authors.ToListAsync();
            return Ok(_mapper.Map<List<AuthorModel>>(temp));
        }

        // GET: api/Authors/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<AuthorModel>> GetAuthor(Guid id)
        {
          if (_context.Authors == null)
          {
              return NotFound();
          }
            var author = await _context.Authors.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            return _mapper.Map<AuthorModel>(author);
        }

        // POST: api/Authors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("save")]
        public async Task<ActionResult<AuthorModel>> PostAuthor(AuthorRequest authorRequestModel)
        {
            if (_context.Authors == null)
            {
                return Problem("Entity set 'LibraryManagementContext.Authors'  is null.");
            }
            RequestSaveAuthorValidate(authorRequestModel);

            Author author = new Author();

            if (!authorRequestModel.Id.HasValue)
            {
                author = _mapper.Map<Author>(authorRequestModel);

                _context.Authors.Add(author);
            }
            else
            {
                author = await _context.Authors.FindAsync(authorRequestModel.Id);
                author = _mapper.Map(authorRequestModel, author);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuthor", new { id = author.Id }, _mapper.Map<AuthorModel>(author));
        }

        // DELETE: api/Authors/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAuthor(Guid id)
        {
            if (_context.Authors == null)
            {
                return NotFound();
            }
            var author = await _context.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Books
        [HttpGet("option")]
        [PubSub(PubSubConstas.AUTHOR_INFO)]
        public async Task<ActionResult<IEnumerable<Option>>> GetAuthorsOption()
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            var authorList = await _context.Authors.ToListAsync(); // Get author list

            return authorList.Select(author => new Option { Value = author.Id, Label = author.Name }).ToList(); // Get author option list
        }

        private bool AuthorExists(Guid id)
        {
            return (_context.Authors?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private void RequestSaveAuthorValidate(AuthorRequest author)
        {
            if (_context.Authors.Any(a => a.Name == author.Name && a.Id != author.Id))
            {
                throw new CustomApiException(500, "This author name is existed.", "This author name is existed.");
            }
            if (_context.Authors.Any(a => ((a.Mail != null && a.Mail == author.Mail) || (a.Phone != null && a.Phone == author.Phone)) && a.Id != author.Id))
            {
                throw new CustomApiException(500, "The author with this email or phone number is existed.", "The author with this email or phone number is existed.");
            }
        }
    }
}
