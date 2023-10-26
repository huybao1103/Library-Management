using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.Account;
using LibraryAPI.Services;
using AutoMapper;
using LibraryAPI.RequestModels.Account;
using LibraryAPI.CustomException;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly HashService _hashService = new HashService();
        private readonly IMapper _mapper;

        public AccountsController(
            LibraryManagementContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountModel>>> GetAccounts()
        {
            var res = await GetAllAccounts().ToListAsync();
            return Ok(_mapper.Map<List<AccountModel>>(res));
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(Guid id)
        {
          if (_context.Accounts == null)
          {
              return NotFound();
          }
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
          if (_context.Accounts == null)
          {
              return Problem("Entity set 'LibraryManagementContext.Accounts'  is null.");
          }
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        [HttpPost("sign-in")]
        public async Task<AccountModel> SignIn(LoginRequest request)
        {
            string password = _hashService.ConvertStringToHash(request.Password);

            if (await _context.Accounts.AnyAsync(a => a.PasswordHash.Equals(password) && a.Email.Equals(request.Email)))
            {
                return _mapper.Map<AccountModel>(
                    await _context.Accounts
                        .Include(a => a.Role)
                            .ThenInclude(r => r.RoleModulePermissions)
                        .FirstOrDefaultAsync(a => a.PasswordHash.Equals(password) && a.Email.Equals(request.Email))
                    );
            }
            throw new CustomApiException(500, "Wrong email or password", "Wrong email or password");
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(Guid id)
        {
            return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private IQueryable<Account> GetAllAccounts()
        {
            return _context.Accounts
                .Include(x => x.Role)
                    .ThenInclude(x => x.RoleModulePermissions)
                .AsQueryable();
        }
    }
}
