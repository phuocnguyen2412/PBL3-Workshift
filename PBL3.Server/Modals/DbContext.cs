using Microsoft.EntityFrameworkCore;
using PBL3.Server.Models;

namespace PBL3.Server.Models
{
    public class MyDbContext : DbContext
    {
        public DbSet<Employee>? Employees { get; set; }
        public DbSet<Duty>? Duties { get; set; }
        public DbSet<Account>? Accounts { get; set; }
        public DbSet<HourHistory>? HourHistories { get; set; }
        public DbSet<Shift>? Shifts { get; set; }
        public DbSet<ShiftInfo>? ShiftInfos { get; set; }
        public DbSet<SalaryHistory>? SalaryHistories { get; set; }
        public DbSet<BonusSalaryHistory>? BonusSalaryHistories { get; set; }
        public DbSet<Violate>? Violates { get; set; }

        public MyDbContext(DbContextOptions<MyDbContext> dbContextOptions) : base(dbContextOptions)
        {
            Database.EnsureCreated();
        }
    }
}
