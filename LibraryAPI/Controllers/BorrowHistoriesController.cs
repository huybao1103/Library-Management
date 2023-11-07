using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using AutoMapper;
using LibraryAPI.ViewModels.BorrowHistory;
using LibraryAPI.CustomException;
using LibraryAPI.Enums;
using LibraryAPI.RequestModels;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowHistoriesController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly IMapper _mapper;

        public BorrowHistoriesController(LibraryManagementContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/BorrowHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BorrowHistoryModel>>> GetBorrowHistories()
        {
            var result = GetAll();
            return Ok(_mapper.Map<BorrowHistoryModel>(result));
        }

        // GET: api/BorrowHistories/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<BorrowHistoryModel>> GetBorrowHistory(Guid id)
        {
            var borrowHistory = await GetById(id);

            if (borrowHistory == null)
            {
                throw new CustomApiException(500, "This history is not existed.", "This history is not existed.");
            }

            return Ok(_mapper.Map<BorrowHistoryModel>(borrowHistory));
        }

        // POST: api/BorrowHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("save")]
        public async Task<List<BorrowHistoryModel>> PostBorrowHistory(List<BorrowHistoryModel> borrowHistoryList, bool isPreorder)
        {
            var borrowHistory = _mapper.Map<List<BorrowHistory>>(borrowHistoryList);
            foreach(var item in borrowHistory)
            {
                var bookChapter = await _context.BookChapters.FirstOrDefaultAsync(i => i.Id == item.BookChapterId);
                bookChapter.Status = isPreorder ? (int?)BookChapterStatusEnum.WaitingForTake : (int?)BookChapterStatusEnum.Borrowed;
                await _context.SaveChangesAsync();
            }
            
            await _context.BorrowHistories.AddRangeAsync(borrowHistory);
            await _context.SaveChangesAsync();

            return _mapper.Map<List<BorrowHistoryModel>>(borrowHistory);
        }

        [HttpPost("edit-history-info")]
        public async Task<ActionResult<BorrowHistoryModel>> EditBorrowHistory(EditHistoryInfoRequest borrowHistoryModel)
        {
            if(!borrowHistoryModel.Id.HasValue)
            {
                throw new CustomApiException(500, "Id must not be null.", "Id must not be null.");
            }

            var borrowHistory = await GetById((Guid)borrowHistoryModel.Id);
            borrowHistory = _mapper.Map(borrowHistoryModel, borrowHistory);

            var bookChapter = await _context.BookChapters.FirstOrDefaultAsync(i => i.Id == borrowHistoryModel.BookChapterId);
            var libraryCard = await _context.LibraryCards.FirstOrDefaultAsync(i => i.Id == borrowHistoryModel.LibraryCardId);

            switch (borrowHistory.Status)
            {
                case (int?)BorrowHistoryStatus.Inactive:
                case (int?)BorrowHistoryStatus.Returned:
                    bookChapter.Status = (int?)BookChapterStatusEnum.Free;
                    break;

                case (int?)BorrowHistoryStatus.Expired:
                case (int?)BorrowHistoryStatus.Active:
                    bookChapter.Status = (int?)BookChapterStatusEnum.Borrowed;
                    break;

                case (int?)BorrowHistoryStatus.Lost:
                    bookChapter.Status = (int?)BookChapterStatusEnum.Lost;
                    bookChapter.LostOrDestroyedDate = DateTime.UtcNow;

                    libraryCard.Status = (int?)LibraryCardStatus.Inactive;
                    break;

                case (int?)BorrowHistoryStatus.Destroyed:
                    bookChapter.Status = (int?)BookChapterStatusEnum.Destroyed;
                    bookChapter.LostOrDestroyedDate = DateTime.UtcNow;

                    libraryCard.Status = (int?)LibraryCardStatus.Inactive;
                    break;
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBorrowHistory", new { id = borrowHistory.Id }, _mapper.Map<BorrowHistoryModel>(borrowHistory));
        }

        // DELETE: api/BorrowHistories/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBorrowHistory(Guid id)
        {
            if (_context.BorrowHistories == null)
            {
                return NotFound();
            }
            var borrowHistory = await _context.BorrowHistories.FindAsync(id);
            if (borrowHistory == null)
            {
                return NotFound();
            }

            _context.BorrowHistories.Remove(borrowHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool BorrowHistoryExists(Guid id)
        {
            return (_context.BorrowHistories?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private IQueryable<BorrowHistory> GetAll()
        {
            return _context.BorrowHistories
                .Include(x => x.LibraryCard)
                .Include(x => x.BookChapter)
                    .ThenInclude(x => x.Book)
                .AsQueryable();
        }

        private Task<BorrowHistory?> GetById(Guid  id)
        {
            return _context.BorrowHistories
                .Include(x => x.LibraryCard)
                .Include(x => x.BookChapter)
                    .ThenInclude(x => x.Book)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
