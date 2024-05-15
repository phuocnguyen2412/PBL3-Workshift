using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class dấdas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateAt",
                table: "HourHistory",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "TotalBonus",
                table: "BonusSalaryHistory",
                newName: "Bonus");

            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "BonusSalaryHistory",
                newName: "Date");

            migrationBuilder.AlterColumn<double>(
                name: "TotalSalary",
                table: "SalaryHistory",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<double>(
                name: "TotalHours",
                table: "SalaryHistory",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<double>(
                name: "HoursPerDay",
                table: "HourHistory",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "HourHistory",
                newName: "DateAt");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "BonusSalaryHistory",
                newName: "DateTime");

            migrationBuilder.RenameColumn(
                name: "Bonus",
                table: "BonusSalaryHistory",
                newName: "TotalBonus");

            migrationBuilder.AlterColumn<int>(
                name: "TotalSalary",
                table: "SalaryHistory",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<int>(
                name: "TotalHours",
                table: "SalaryHistory",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<string>(
                name: "HoursPerDay",
                table: "HourHistory",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
