using Microsoft.EntityFrameworkCore;

namespace PBL3.Server.Data

{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> option) : base(option) { }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<ShiftInfo>()
        //        .Property(e => e.Date)
        //        .HasConversion(
        //            v => v.ToDateTime(TimeOnly.MinValue), // Existing conversion for DateOnly to DateTime
        //            v => DateOnly.FromDateTime(v) // Existing conversion for DateTime to DateOnly
        //        );

        //    // Add this block for the TimeOnly property named EndTime
        //    modelBuilder.Entity<ShiftInfo>()
        //        .Property(e => e.EndTime) // Assuming your ShiftInfo class has a TimeOnly property named EndTime
        //        .HasConversion(
        //            v => v.ToTimeSpan(), // Convert TimeOnly to TimeSpan when saving to database
        //            v => TimeOnly.FromTimeSpan(v) // Convert TimeSpan to TimeOnly when reading from database
        //        );

        //    // Add this block for the TimeOnly property named StartTime
        //    modelBuilder.Entity<ShiftInfo>()
        //        .Property(e => e.StartTime)
        //        .HasConversion(
        //            v => v.ToTimeSpan(), // Convert TimeOnly to TimeSpan when saving to database
        //            v => TimeOnly.FromTimeSpan(v) // Convert TimeSpan to TimeOnly when reading from database
        //        );



        //    #region DbSet declarations
        //    // Your DbSet properties
        //    modelBuilder.Entity<ShiftInfo>();

        //    #endregion
        //}

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
