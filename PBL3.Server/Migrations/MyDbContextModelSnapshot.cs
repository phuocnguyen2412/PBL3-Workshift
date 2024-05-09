﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PBL3.Server.Data;

#nullable disable

namespace PBL3.Server.Migrations
{
    [DbContext(typeof(MyDbContext))]
    partial class MyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("PBL3.Server.Data.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Account");
                });

            modelBuilder.Entity("PBL3.Server.Data.BonusSalaryHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Reason")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalBonus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("BonusSalaryHistory");
                });

            modelBuilder.Entity("PBL3.Server.Data.Duty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<double>("BasicSalary")
                        .HasColumnType("float");

                    b.Property<string>("DutyName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Duty");
                });

            modelBuilder.Entity("PBL3.Server.Data.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<double>("CoefficientsSalary")
                        .HasColumnType("float");

                    b.Property<int>("DutyId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("FullName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<bool>("TypeOfEmployee")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("DutyId");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("PBL3.Server.Data.HourHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DateAt")
                        .HasColumnType("DATE");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("HoursPerDay")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("HourHistory");
                });

            modelBuilder.Entity("PBL3.Server.Data.SalaryHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("DATE");

                    b.Property<DateTime>("PaidDate")
                        .HasColumnType("DATE");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("DATE");

                    b.Property<int>("TotalBonus")
                        .HasColumnType("int");

                    b.Property<int>("TotalHours")
                        .HasColumnType("int");

                    b.Property<int>("TotalSalary")
                        .HasColumnType("int");

                    b.Property<int>("TotalViolate")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("SalaryHistory");
                });

            modelBuilder.Entity("PBL3.Server.Data.Shift", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<TimeSpan>("CheckInTime")
                        .HasColumnType("TIME");

                    b.Property<TimeSpan>("CheckOutTime")
                        .HasColumnType("TIME");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<int>("ShiftInfoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Shift");
                });

            modelBuilder.Entity("PBL3.Server.Data.ShiftInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Checked")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Date")
                        .HasColumnType("DATE");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("TIME");

                    b.Property<int>("ManagerId")
                        .HasColumnType("int");

                    b.Property<string>("ShiftName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("TIME");

                    b.HasKey("Id");

                    b.ToTable("ShiftInfo");
                });

            modelBuilder.Entity("PBL3.Server.Data.Violate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Checked")
                        .HasColumnType("bit");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Handle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ShiftInfoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ShiftInfoId");

                    b.ToTable("Violate");
                });

            modelBuilder.Entity("PBL3.Server.Data.Account", b =>
                {
                    b.HasOne("PBL3.Server.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("PBL3.Server.Data.BonusSalaryHistory", b =>
                {
                    b.HasOne("PBL3.Server.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("PBL3.Server.Data.Employee", b =>
                {
                    b.HasOne("PBL3.Server.Data.Duty", "Duty")
                        .WithMany()
                        .HasForeignKey("DutyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Duty");
                });

            modelBuilder.Entity("PBL3.Server.Data.HourHistory", b =>
                {
                    b.HasOne("PBL3.Server.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("PBL3.Server.Data.SalaryHistory", b =>
                {
                    b.HasOne("PBL3.Server.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("PBL3.Server.Data.Shift", b =>
                {
                    b.HasOne("PBL3.Server.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PBL3.Server.Data.ShiftInfo", "ShiftInfo")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("ShiftInfo");
                });

            modelBuilder.Entity("PBL3.Server.Data.Violate", b =>
                {
                    b.HasOne("PBL3.Server.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PBL3.Server.Data.ShiftInfo", "ShiftInfo")
                        .WithMany()
                        .HasForeignKey("ShiftInfoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("ShiftInfo");
                });
#pragma warning restore 612, 618
        }
    }
}
