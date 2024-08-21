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
        public async Task<IActionResult> AddMembers(AddMember addmember)
        {
            var membersObject = new Members()
            {
                FirstName = addmember.FirstName,
                LastName = addmember.LastName,
                Email = addmember.Email,
                Phone = addmember.Phone,
                Status = addmember.Status,
            };

            await _context.Member.AddAsync(membersObject);
            await _context.SaveChangesAsync();
            return Ok(membersObject);
        }
        [HttpGet]
        public IActionResult GetMembers()
        {
            var membersList = _context.Member.ToList();
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

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateMember(Guid id, UpdateMember updateMember)
        {
            var member = await _context.Member.FindAsync(id);
            if (member is null)
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
            return Ok();
        }
    }
}