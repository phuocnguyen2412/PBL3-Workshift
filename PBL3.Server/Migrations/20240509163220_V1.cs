using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Duty",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DutyName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BasicSalary = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Duty", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShiftInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShiftName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Date = table.Column<DateTime>(type: "DATE", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "TIME", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "TIME", nullable: false),
                    Checked = table.Column<bool>(type: "bit", nullable: false),
                    ManagerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShiftInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    TypeOfEmployee = table.Column<bool>(type: "bit", nullable: false),
                    CoefficientsSalary = table.Column<double>(type: "float", nullable: false),
                    DutyId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employee_Duty_DutyId",
                        column: x => x.DutyId,
                        principalTable: "Duty",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Account_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BonusSalaryHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalBonus = table.Column<int>(type: "int", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BonusSalaryHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BonusSalaryHistory_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HourHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    HoursPerDay = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAt = table.Column<DateTime>(type: "DATE", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HourHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HourHistory_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalaryHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "DATE", nullable: false),
                    EndDate = table.Column<DateTime>(type: "DATE", nullable: false),
                    TotalHours = table.Column<int>(type: "int", nullable: false),
                    TotalBonus = table.Column<int>(type: "int", nullable: false),
                    TotalViolate = table.Column<int>(type: "int", nullable: false),
                    TotalSalary = table.Column<int>(type: "int", nullable: false),
                    PaidDate = table.Column<DateTime>(type: "DATE", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalaryHistory_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Shift",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShiftInfoId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    CheckInTime = table.Column<TimeSpan>(type: "TIME", nullable: false),
                    CheckOutTime = table.Column<TimeSpan>(type: "TIME", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shift", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shift_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shift_ShiftInfo_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "ShiftInfo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Violate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    ShiftInfoId = table.Column<int>(type: "int", nullable: false),
                    Handle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Checked = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Violate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Violate_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Violate_ShiftInfo_ShiftInfoId",
                        column: x => x.ShiftInfoId,
                        principalTable: "ShiftInfo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_EmployeeId",
                table: "Account",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_BonusSalaryHistory_EmployeeId",
                table: "BonusSalaryHistory",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_DutyId",
                table: "Employee",
                column: "DutyId");

            migrationBuilder.CreateIndex(
                name: "IX_HourHistory_EmployeeId",
                table: "HourHistory",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryHistory_EmployeeId",
                table: "SalaryHistory",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Shift_EmployeeId",
                table: "Shift",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Violate_EmployeeId",
                table: "Violate",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Violate_ShiftInfoId",
                table: "Violate",
                column: "ShiftInfoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "BonusSalaryHistory");

            migrationBuilder.DropTable(
                name: "HourHistory");

            migrationBuilder.DropTable(
                name: "SalaryHistory");

            migrationBuilder.DropTable(
                name: "Shift");

            migrationBuilder.DropTable(
                name: "Violate");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "ShiftInfo");

            migrationBuilder.DropTable(
                name: "Duty");
        }
    }
}
