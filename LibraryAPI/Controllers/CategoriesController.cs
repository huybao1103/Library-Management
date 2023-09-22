using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using LibraryAPI.PubSub;
using LibraryAPI.CustomException;
using LibraryAPI.RequestModels;
using LibraryAPI.ViewModels.Book;
using AutoMapper;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(
            LibraryManagementContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryModel>>> GetCategories()
        {
            var result = await _context.Categories.ToListAsync();
            return Ok( _mapper.Map<List<CategoryModel>>
                (
                    result
                ));
        }

        // GET: api/Categories/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<CategoryModel>> GetCategory(Guid id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return  _mapper.Map<CategoryModel>(category);
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("save")]
        public async Task<ActionResult<CategoryModel>> PostCategory(CategoryRequest categoryRequestModel)
        {
          if (_context.Categories == null)
          {
              return Problem("Entity set 'LibraryManagementContext.Categories'  is null.");
          }
            RequestSaveCategoryValidate(categoryRequestModel);

            CategoryModel? categoryModel;
            if(!categoryRequestModel.Id.HasValue)
            {
                var newCategory = _mapper.Map<Category>(categoryRequestModel);
                _context.Categories.Add(newCategory);
                categoryModel = _mapper.Map<CategoryModel>(newCategory);
            }
            else
            {
                var category = await _context.Categories.FindAsync(categoryRequestModel.Id);
                category = _mapper.Map(categoryRequestModel, category);
                categoryModel = _mapper.Map<CategoryModel>(category);
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCategory", new { id = categoryModel.Id }, categoryModel);
        }

        // DELETE: api/Categories/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("option")]
        public async Task<ActionResult<IEnumerable<Option>>> GetCategoriesOption()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var categoriesList = await _context.Categories.ToListAsync(); // Get author list

            return categoriesList.Select(cate => new Option { Value = cate.Id, Label = cate.Name }).ToList(); // Get author option list
        }

        private bool CategoryExists(Guid id)
        {
            return (_context.Categories?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private void RequestSaveCategoryValidate(CategoryRequest categoryRequestModel)
        {
            if (_context.Categories.Any(a => a.Name == categoryRequestModel.Name && a.Id != categoryRequestModel.Id))
            {
                throw new CustomApiException(500, "This category name is existed.", "This book name is existed.");
            }
        }
    }
}
