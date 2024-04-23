using Microsoft.EntityFrameworkCore;

namespace PBL3.Server.Modals
{
    public class MyDbContext : DbContext
    {
        
        public DbSet<Employee> Employees { get; set; } 
        public DbSet<Duty> Duties { get; set; }
        public MyDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) {
            Database.SetInitial<MyDbContext>(new CreateDB());
        }

    }
}
