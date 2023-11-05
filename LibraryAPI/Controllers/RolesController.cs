using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.Role;
using AutoMapper;
using LibraryAPI.Enums;
using LibraryAPI.CustomException;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly LibraryManagementContext _context;
        private readonly IMapper _mapper;

        public RolesController(LibraryManagementContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRoles()
        {
          if (_context.Roles == null)
          {
              return NotFound();
          }
            return Ok(_mapper.Map<List<RoleModel>>
                (
                    await _context.Roles
                    .Include(r => r.RoleModulePermissions.OrderBy(rmp => rmp.Module))
                    .ToListAsync()
                ));
        }

        // GET: api/Roles/5
        [HttpGet("get-by-id/{id}")]
        public async Task<ActionResult<RoleModel>> GetRole(Guid id)
        {
          if (_context.Roles == null)
          {
              return NotFound();
          }
            Role role = await _context.Roles
                .Include(r => r.RoleModulePermissions.OrderBy(rmp => rmp.Module))
                .FirstOrDefaultAsync(r => r.Id == id);

            if (role == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<RoleModel>(role));
        }

        // POST: api/Roles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
          if (_context.Roles == null)
          {
              return Problem("Entity set 'LibraryManagementContext.Roles'  is null.");
          }
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRole", new { id = role.Id }, role);
        }

        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(Guid id)
        {
            if (_context.Roles == null)
            {
                return NotFound();
            }
            var role = await _context.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("option")]
        public async Task<ActionResult<IEnumerable<Option>>> GetRolesOption()
        {
            var roleList = await _context.Roles.Where(r => r.Name != "Reader").ToListAsync(); // Get author list

            return roleList.Select(role => new Option { Value = role.Id, Label = role.Name }).ToList(); // Get author option list
        }

        [HttpGet("new-role/{roleName}")]
        public async Task<Guid> NewRole(string roleName)
        {
            Role newRole = new Role { Name = roleName, NormalizedName = roleName.ToLower() };

            List<RoleModulePermission> permissions = new List<RoleModulePermission>();
            foreach (int item in Enum.GetValues(typeof(ModuleEnum)))
            {
                permissions.Add(new RoleModulePermission
                {
                    Module = item,
                    Access = false,
                    Delete = false,
                    Create = false,
                    Detail = false,
                    Edit = false,
                    RoleId = newRole.Id
                });
            }

            newRole.RoleModulePermissions = permissions;
            _context.Roles.Add(newRole);
            await _context.SaveChangesAsync();

            return newRole.Id;
        }

        [HttpPost("save-change")]
        public async Task<RoleModel> SavePermissionChange(RoleModel model)
        {
            Role role = await _context.Roles.FindAsync(model.Id);
            if(role == null)
            {
                throw new CustomApiException(500, "Cannot find this module permission, please contact IT for support.", "Cannot find this module permission, please contact IT for support.");
            }
            role = _mapper.Map(model, role);

            await _context.SaveChangesAsync();
            return _mapper.Map<RoleModel>(role);
        }
        private bool RoleExists(Guid id)
        {
            return (_context.Roles?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
