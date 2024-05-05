using Microsoft.EntityFrameworkCore;

namespace PBL3.Server.Data

{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> option) : base(option) { }
        #region
        public DbSet<Employee>? Employees { get; set; }
        public DbSet<Duty>? Duties { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<HourHistory>? HourHistories { get; set; }
        public DbSet<Shift>? Shifts { get; set; }
        public DbSet<ShiftInfo>? ShiftInfos { get; set; }
        public DbSet<SalaryHistory>? SalaryHistories { get; set; }
        public DbSet<BonusSalaryHistory>? BonusSalaryHistories { get; set; }
        public DbSet<Violate>? Violates { get; set; }
        #endregion
    }
}
