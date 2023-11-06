using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.LibraryCard;
using AutoMapper;
using LibraryAPI.CustomException;
using LibraryAPI.ViewModels.Book;
using LibraryAPI.RequestModels;
using System.Collections.Immutable;
using LibraryAPI.PubSub;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryCardsController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly IMapper _mapper;

        public LibraryCardsController(LibraryManagementContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/LibraryCards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LibraryCardModel>>> GetLibraryCards()
        {
            var result = await GetAllCard().ToListAsync();
            return Ok(_mapper.Map<List<LibraryCardModel>>(result));
        }

        // GET: api/LibraryCards/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<LibraryCardModel>> GetLibraryCard(Guid? id)
        {
          if (_context.LibraryCards == null)
          {
              return NotFound();
          }
            var libraryCard = GetCardByIdAsync((Guid)id);

            if (libraryCard == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<LibraryCardModel>(libraryCard));
        }

        [HttpGet("get-by-account-id/{accountId}")]
        public async Task<ActionResult<LibraryCardModel>> GetLibraryCardByAccountId(Guid? accountId)
        {
            if (_context.LibraryCards == null)
            {
                return NotFound();
            }
            var libraryCard = _context.LibraryCards
                    .Include(c => c.StudentImages)
                        .ThenInclude(c => c.File)
                    .Include(c => c.BorrowHistories.OrderByDescending(x => x.BorrowDate))
                        .ThenInclude(c => c.BookChapter)
                            .ThenInclude(c => c.Book)
                    .FirstOrDefault(c => c.AccountId == accountId);

            if (libraryCard == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<LibraryCardModel>(libraryCard));
        }

        // POST: api/LibraryCards
        [HttpPost("save")]
        public async Task<ActionResult<LibraryCardModel>> PostLibraryCard(LibraryCardRequest libraryCardModel)
        {
            if (_context.LibraryCards == null)
            {
                return Problem("Entity set 'LibraryManagementContext.LibraryCards'  is null.");
            }
            RequestSaveCardValidate(libraryCardModel);

            LibraryCard? card;
            if (libraryCardModel.Id.HasValue)
            {
                card = GetCardByIdAsync((Guid)libraryCardModel.Id);
                //card.StudentImages.Clear();
                card = _mapper.Map(libraryCardModel, card);
            }
            else
            {
                card = _mapper.Map<LibraryCard>(libraryCardModel);
                _context.LibraryCards.Add(card);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLibraryCard", new { id = card.Id }, _mapper.Map<LibraryCardModel>(card));
        }

        // DELETE: api/LibraryCards/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteLibraryCard(Guid id)
        {
            if (_context.LibraryCards == null)
            {
                return NotFound();
            }
            var libraryCard = _context.LibraryCards
                            .Include(c => c.StudentImages)
                                .ThenInclude(a => a.File).FirstOrDefault(c => c.Id == id);
            if (libraryCard == null)
            {
                return NotFound();
            }
            libraryCard.StudentImages.Clear();

            libraryCard.StudentImages.Clear();

            if(libraryCard.AccountId.HasValue)
            {
                Account account = await _context.Accounts.FindAsync(libraryCard.AccountId.Value);
                _context.Accounts.Remove(account);
            }

            _context.LibraryCards.Remove(libraryCard);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("option")]
        public async Task<ActionResult<IEnumerable<Option>>> GetLibraryCardsOption()
        {
            if (_context.LibraryCards == null)
            {
                return NotFound();
            }
            var carList = await _context.LibraryCards.ToListAsync(); // Get card list

            return carList.Select(card => new Option { Value = card.Id, Label = card.Name }).ToList(); // Get card option list
        }

        [HttpGet("option/new-reader-account")]
        public async Task<ActionResult<IEnumerable<Option>>> GetNewLibraryCardsOption()
        {
            if (_context.LibraryCards == null)
            {
                return NotFound();
            }
            var carList = await _context.LibraryCards.Where(c => !c.AccountId.HasValue).ToListAsync(); // Get card list

            return carList.Select(card => new Option { Value = card.Id, Label = card.Name }).ToList(); // Get card option list
        }



        private bool LibraryCardExists(Guid id)
        {
            return (_context.LibraryCards?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private void RequestSaveCardValidate(LibraryCardRequest libraryCardModel)
        {
            LibraryCard libraryCard = _mapper.Map<LibraryCard>(libraryCardModel);

            if (_context.LibraryCards.Any(card => card.Name == libraryCard.Name && card.Id != libraryCard.Id))
            {
                throw new CustomApiException(500, "Student name is existed.", "Student name is existed.");
            }
            if (_context.LibraryCards.Any(card => card.StudentId.ToLower() == libraryCard.StudentId.ToLower() && card.Id != libraryCard.Id))
            {
                throw new CustomApiException(500, "Student ID is existed.", "Student ID is existed.");
            }
        }

        private LibraryCard? GetCardByIdAsync(Guid cardId)
        {
            return _context.LibraryCards
                    .Include(c => c.StudentImages)
                        .ThenInclude(c => c.File)
                    .Include(c => c.BorrowHistories.OrderByDescending(x => x.BorrowDate))
                        .ThenInclude(c => c.BookChapter)
                            .ThenInclude(c => c.Book)
                    .FirstOrDefault(book => book.Id == cardId);
        }

        private IQueryable<LibraryCard> GetAllCard()
        {
            return _context.LibraryCards
                    .Include(c => c.StudentImages)
                        .ThenInclude(c => c.File).AsQueryable();
        }
    }
}
