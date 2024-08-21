using Microsoft.EntityFrameworkCore;
using Models;

namespace ApplicationDBContext
{
    public class CCFIDBContext : DbContext
    {
        public CCFIDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Members> Member { get; set; }
    }
}