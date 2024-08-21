using ApplicationDBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly CCFIDBContext _context;

        public MembersController(CCFIDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddMembers([FromBody] AddMember addMember)
        {
            var membersObject = new Members()
            {
                FirstName = addMember.FirstName,
                LastName = addMember.LastName,
                Email = addMember.Email,
                Phone = addMember.Phone,
                Status = addMember.Status,
            };

            await _context.Member.AddAsync(membersObject);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMembers), new { id = membersObject.Id }, membersObject);
        }

        [HttpGet]
        public async Task<IActionResult> GetMembers()
        {
            var membersList = await _context.Member.ToListAsync();
            return Ok(membersList);
        }

        [HttpGet("metrics")]
        public async Task<IActionResult> GetMemberMetrics()
        {
            var totalMembers = await _context.Member.CountAsync();
            var activeMembers = await _context.Member.CountAsync(m => m.Status == "Active");
            var inactiveMembers = await _context.Member.CountAsync(m => m.Status == "Inactive");

            var metrics = new
            {
                TotalMembers = totalMembers,
                ActiveMembers = activeMembers,
                InactiveMembers = inactiveMembers
            };

            return Ok(metrics);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(Guid id, [FromBody] UpdateMember updateMember)
        {
            var member = await _context.Member.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            member.FirstName = updateMember.FirstName;
            member.LastName = updateMember.LastName;
            member.Email = updateMember.Email;
            member.Phone = updateMember.Phone;
            member.Status = updateMember.Status;

            await _context.SaveChangesAsync();
            return Ok(member);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMembers(Guid id)
        {
            var deleteMember = await _context.Member.FindAsync(id);
            if (deleteMember == null)
            {
                return NotFound();
            }

            _context.Member.Remove(deleteMember);
            await _context.SaveChangesAsync();
            return NoContent(); // Returns 204 No Content
        }
    }
}
