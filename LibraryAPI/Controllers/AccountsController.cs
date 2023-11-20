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
using LibraryAPI.ViewModels.Book;
using LibraryAPI.Enums;
using Microsoft.OpenApi.Extensions;
using LibraryAPI.ViewModels.LibraryCard;
using System.Security.Cryptography.Xml;
using LibraryAPI.ViewModels.Employee;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly HashService _hashService = new HashService();
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public AccountsController(
            LibraryManagementContext context,
            IMapper mapper,
            IEmailService emailService
            )
        {
            _context = context;
            _mapper = mapper;
            _emailService = emailService;
        }

        // GET: api/Accounts
        [HttpGet("reader-account/get-list")]
        public async Task<ActionResult<IEnumerable<LibraryCardModel>>> GetReaderAccount()
        {
            List<LibraryCard> libraryCard = await _context.LibraryCards
                .Where(x => x.AccountId.HasValue)
                .Include(x => x.StudentImages)
                    .ThenInclude(x => x.File)
                .ToListAsync();

            List<LibraryCardModel> res = _mapper.Map<List<LibraryCardModel>>(libraryCard);

            List<AccountModel> accountList = _mapper.Map<List<AccountModel>>(await _context.Accounts.ToListAsync());

            res.ForEach(x => x.Account = accountList.FirstOrDefault(acc => acc.Id == x.AccountId));

            return Ok(res);
        }

        // GET: api/Accounts/5
        [HttpGet("reader-account/get-by-id/{id}")]
        public async Task<ActionResult<ReaderAccountSaveRequest>> GetReaderAccountById(Guid id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            Account account = await GetAccountById(id);

            if (account == null)
            {
                return NotFound();
            }
            ReaderAccountSaveRequest model = _mapper.Map<ReaderAccountSaveRequest>(account);

            LibraryCard libraryCard = await _context.LibraryCards.FirstOrDefaultAsync(c => c.AccountId == id);

            if(libraryCard == null)
            {
                throw new CustomApiException(500, "Cannot find the Library Card related to this Account.", "Cannot find the Library Card related to this Account.");
            }
            model.LibraryCardId = libraryCard.Id;

            return Ok(model);
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("save-reader-account")]
        public async Task<ActionResult<ReaderAccountSaveRequest>> PostAccount(ReaderAccountSaveRequest request)
        {
            if(request.LibraryCardId == Guid.Empty)
            {
                throw new CustomApiException(500, "Reader Account must be related to a Library Card.", "Reader Account must be related to a Library Card");
            }

            LibraryCard libraryCard = await _context.LibraryCards.FindAsync(request.LibraryCardId);
            if (libraryCard == null)
            {
                throw new CustomApiException(500, "Cannot find this Library Card.", "Cannot find this Library Card.");
            }

            RequestSaveReaderAccountValidate(request);

            Role role = await _context.Roles.FirstOrDefaultAsync(r => r.NormalizedName == DefaultRoleEnum.Reader.GetDisplayName().ToLower());
            Account? account;

            if(!request.Id.HasValue)
            {
                account = _mapper.Map<Account>(request);
                account.PasswordHash = _hashService.ConvertStringToHash(request.Password);
                account.RoleId = role.Id;

                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();

                libraryCard.AccountId = account.Id;
            }
            else
            {
                LibraryCard oldLibraryCard = await _context.LibraryCards.FirstOrDefaultAsync(c => c.AccountId == request.Id);
                if(oldLibraryCard.Id != libraryCard.Id)
                {
                    oldLibraryCard.AccountId = null;
                }
                libraryCard.AccountId = request.Id;

                account = await _context.Accounts.FindAsync(request.Id);
                account = _mapper.Map(request, account);

                if(request.Password != null)
                    account.PasswordHash = _hashService.ConvertStringToHash(request.Password);
                account.RoleId = role.Id;

            }
            await _context.SaveChangesAsync();
            request.Id = account.Id;

            return CreatedAtAction("GetReaderAccountById", new { id = account.Id }, request);
        }

        [HttpGet("employee-account/get-list")]
        public async Task<ActionResult<IEnumerable<EmployeeModel>>> GetEmployeeAccount()
        {
            List<Employee> employees = await _context.Employees.ToListAsync();

            List<EmployeeModel> res = _mapper.Map<List<EmployeeModel>>(employees);

            List<AccountModel> accountList = _mapper.Map<List<AccountModel>>(await _context.Accounts.Include(a => a.Role).ToListAsync());

            res.ForEach(x => x.Account = accountList.FirstOrDefault(acc => acc.Id == x.AccountId));

            return Ok(res);
        }

        [HttpGet("employee-account/get-by-id/{empId}")]
        public async Task<ActionResult<EmployeeAccountSaveRequest>> GetEmployeeAccountById(Guid empId)
        {
            Employee employees = await _context.Employees
                .FirstOrDefaultAsync(x => x.Id == empId);
            if(employees == null)
            {
                throw new CustomApiException(500, "Cannot find this Employee.", "Cannot find this Employee.");
            }

            EmployeeAccountSaveRequest res = _mapper.Map<EmployeeAccountSaveRequest>(employees);

            if(res.AccountId.HasValue)
            {
                res = _mapper.Map(await _context.Accounts.FindAsync(res.AccountId), res);
            }
            res.Id = empId;
            return Ok(res);
        }

        [HttpPost("save-employee-account")]
        public async Task<ActionResult<EmployeeAccountSaveRequest>> SaveEmployee(EmployeeAccountSaveRequest request)
        {

            RequestSaveEmployeeAccountValidate(request);

            Account? account = null;
            Employee? employee;

            if (!request.Id.HasValue)
            {
                if(request.Email != null)
                {
                    account = _mapper.Map<Account>(request);
                    account.PasswordHash = _hashService.ConvertStringToHash(request.Password);

                    _context.Accounts.Add(account);
                    await _context.SaveChangesAsync();
                }

                employee = _mapper.Map<Employee>(request);
                employee.AccountId = account != null ? account.Id : null; 

                _context.Employees.Add(employee);
            }
            else
            {
                employee = await _context.Employees.FirstAsync(e => e.Id == request.Id);
                if (request.AccountId.HasValue)
                {
                    account = await _context.Accounts.FirstAsync(a => a.Id == request.AccountId);
                    account.Email = request.Email;
                }
                else if (request.Email != null)
                {
                    account = _mapper.Map<Account>(request);

                    _context.Accounts.Add(account);
                }
                if (request.Password != null)
                    account.PasswordHash = _hashService.ConvertStringToHash(request.Password);

                employee = _mapper.Map(request, employee);
            }
            await _context.SaveChangesAsync();
            request.Id = account.Id;

            return CreatedAtAction("GetEmployeeAccountById", new { empId = account.Id }, request);
        }

        [HttpPost("log-in")]
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

        [HttpPost("register")]
        public async Task<bool> Register(RegisterRequest request)
        {
            string passwordHash = _hashService.ConvertStringToHash(request.Password);

            if (await _context.Accounts.AnyAsync(a => a.Email.Equals(request.Email)))
                throw new CustomApiException(500, "This email is already existed", "This email is already existed");
            if (await _context.LibraryCards.AnyAsync(a => a.StudentId.Equals(request.Id)))
                throw new CustomApiException(500, "This Student ID is already existed", "This Student ID is already existed");


            Role readerRole = await _context.Roles.FirstOrDefaultAsync(r => r.NormalizedName == DefaultRoleEnum.Reader.GetDisplayName().ToLower());


            Account account = new Account();
            account.Email = request.Email;
            account.PasswordHash = passwordHash;
            account.RoleId = readerRole.Id;
            await _context.Accounts.AddAsync(account);

            await _context.SaveChangesAsync();

            LibraryCard libraryCard = new LibraryCard();
            libraryCard.StudentId = request.Id;
            libraryCard.Name = request.Name;
            libraryCard.Class = request.Clazz;
            libraryCard.AccountId = account.Id;
            libraryCard.Status = (int?)LibraryCardStatus.Inactive;
            await _context.LibraryCards.AddAsync(libraryCard);

            await _context.SaveChangesAsync();
            return true;
        }

        // DELETE: api/Accounts/5
        [HttpDelete("employee-account/remove/{empId}")]
        public async Task<IActionResult> DeleteEmployeeAccount(Guid empId)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }

            Employee employee = await _context.Employees.FindAsync(empId);
            if (employee == null)
            {
                return NotFound();
            }

            if(employee.AccountId.HasValue)
            {
                Account account = await _context.Accounts.FindAsync(employee.AccountId.Value);
                _context.Accounts.Remove(account);
            }

            _context.Employees.Remove(employee);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("reader-account/remove/{accountId}")]
        public async Task<IActionResult> DeleteReaderAccount(Guid accountId)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }

            Account account = await _context.Accounts.FindAsync(accountId);
            LibraryCard libraryCard = await _context.LibraryCards.FirstOrDefaultAsync(c => c.AccountId == accountId);

            if (account == null)
            {
                return NotFound();
            }

            libraryCard.AccountId = null;

            _context.Accounts.Remove(account);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("send-reset-password-mail")]
        public async Task<bool> SendResetPasswordMail(LoginRequest data)
        {
            Account account = await _context.Accounts.FirstOrDefaultAsync(a => a.Email.Equals(data.Email));
            if(account == null)
            {
                throw new CustomApiException(500, "This email is not exist.", "This email is not exist.");
            }

            string resetPasswordLink = $"http://localhost:4200/reset-password/{account.Id}/{account.Email}";

            var replacements = new Dictionary<string, string>
            {
                { "Subject", "Forgot Password " },
                { "ResetPasswordLink", resetPasswordLink }
            };
            await _emailService.SendResetPasswordEmailAsync(data.Email, "Test Subject", replacements);
            return true;
        }

        [HttpPost("reset-password")]
        public async Task<bool> ResetPassword(ResetPasswordRequest request)
        {
            Account account = await _context.Accounts.FindAsync(request.AccountId);
            if (account == null)
            {
                throw new CustomApiException(500, "This email is not exist.", "This email is not exist.");
            }
            string passwordHash = _hashService.ConvertStringToHash(request.Password);
            account.PasswordHash = passwordHash;

            await _context.SaveChangesAsync();
            return true;
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

        private async Task<Account> GetAccountById(Guid id)
        {
            return await _context.Accounts
                .Where(a => a.Id == id)
                .Include(x => x.Role)
                    .ThenInclude(x => x.RoleModulePermissions)
                .FirstAsync();
        }

        private void RequestSaveReaderAccountValidate(ReaderAccountSaveRequest request)
        {
            Account account = _mapper.Map<Account>(request);

            if (_context.Accounts.Any(account => account.Email == request.Email && account.Id != request.Id))
            {
                throw new CustomApiException(500, "This email is already existed.", "This email is already existed.");
            }
        }
        private void RequestSaveEmployeeAccountValidate(EmployeeAccountSaveRequest request)
        {
            Account account = _mapper.Map<Account>(request);

            if (_context.Accounts.Any(account => account.Email == request.Email && account.Id != request.AccountId))
            {
                throw new CustomApiException(500, "This email is already existed.", "This email is already existed.");
            }
        }
    }
}
