using Microsoft.EntityFrameworkCore;
using PBL3.Server.Models;

namespace PBL3.Server.Data

{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> option) : base(option) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ShiftInfoModel>()
                .Property(m => m.Date)
                .HasColumnType("DATE");

            modelBuilder.Entity<ShiftInfoModel>()
                .Property(m => m.StartTime)
                .HasColumnType("TIME");

            modelBuilder.Entity<ShiftInfoModel>()
                .Property(m => m.EndTime)
                .HasColumnType("TIME");

            modelBuilder.Entity<ShiftModel>()
                .Property(m => m.CheckInTime)
                .HasColumnType("DATE");

            modelBuilder.Entity<ShiftModel>()
                .Property(m => m.CheckOutTime)
                .HasColumnType("DATE");

            modelBuilder.Entity<SalaryHistoryModel>()
                .Property(m => m.StartDate)
                .HasColumnType("DATE");

            modelBuilder.Entity<SalaryHistoryModel>()
                .Property(m => m.EndDate)
                .HasColumnType("DATE");

            modelBuilder.Entity<SalaryHistoryModel>()
                .Property(m => m.PaidDate)
                .HasColumnType("DATE");

            modelBuilder.Entity<HourHistoryModel>()
                .Property(m => m.DateAt)
                .HasColumnType("DATE");

        }

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
