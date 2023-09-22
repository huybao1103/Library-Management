using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.Publisher;
using AutoMapper;
using LibraryAPI.ViewModels.Book;
using LibraryAPI.RequestModels;
using LibraryAPI.CustomException;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishersController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly IMapper _mapper;

        public PublishersController(
            LibraryManagementContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Publishers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PublisherModel>>> GetPublishers()
        {
            return Ok(_mapper.Map<List<PublisherModel>>(_context.Publishers.ToListAsync()));
        }

        // GET: api/Publishers/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<PublisherModel>> GetPublisher(Guid id)
        {
          if (_context.Publishers == null)
          {
              return NotFound();
          }
            var publisher = await _context.Publishers.FindAsync(id);

            if (publisher == null)
            {
                return NotFound();
            }

            return _mapper.Map<PublisherModel>(publisher);
        }

        // POST: api/Publishers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("save")]
        public async Task<ActionResult<PublisherModel>> PostPublisher(PublisherRequest publisherRequestModel)
        {
          if (_context.Publishers == null)
          {
              return Problem("Entity set 'LibraryManagementContext.Publishers'  is null.");
          }

            RequestSavePublisherValidate(publisherRequestModel);

            PublisherModel? publisherModel;
            if (publisherRequestModel.Id == Guid.Empty)
            {
                var newPublisher = _mapper.Map<Publisher>(publisherRequestModel);
                _context.Publishers.Add(newPublisher);
                publisherModel = _mapper.Map<PublisherModel>(newPublisher);
            }
            else
            {
                var publisher = await _context.Publishers.FindAsync(publisherRequestModel.Id);
                publisher = _mapper.Map(publisherRequestModel, publisher);
                publisherModel = _mapper.Map<PublisherModel>(publisher);
            }

            return CreatedAtAction("GetPublisher", new { id = publisherModel.Id }, publisherModel);
        }

        // DELETE: api/Publishers/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePublisher(Guid id)
        {
            if (_context.Publishers == null)
            {
                return NotFound();
            }
            var publisher = await _context.Publishers.FindAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            _context.Publishers.Remove(publisher);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("option")]
        public async Task<ActionResult<IEnumerable<Option>>> GetPublishersOption()
        {
            if (_context.Publishers == null)
            {
                return NotFound();
            }
            var publishersList = await _context.Publishers.ToListAsync(); // Get author list

            return publishersList.Select(cate => new Option { Value = cate.Id, Label = cate.Name }).ToList(); // Get author option list
        }

        private bool PublisherExists(Guid id)
        {
            return (_context.Publishers?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private void RequestSavePublisherValidate(PublisherRequest publisherRequestModel)
        {
            if (_context.Publishers.Any(a => a.Name == publisherRequestModel.Name && a.Id != publisherRequestModel.Id))
            {
                throw new CustomApiException(500, "This publisher name is existed.", "This publisher name is existed.");
            }
            if (_context.Publishers.Any(a => ((a.Mail != null && a.Mail == publisherRequestModel.Mail) || (a.Phone != null && a.Phone == publisherRequestModel.Phone)) && a.Id != publisherRequestModel.Id))
            {
                throw new CustomApiException(500, "The publisher with this email or phone number is existed.", "The publisher with this email or phone number is existed.");
            }
        }
    }
}
