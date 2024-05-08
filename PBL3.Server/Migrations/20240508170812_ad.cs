using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class ad : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BonusSalaryHistory_Employee_EmployeeId",
                table: "BonusSalaryHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Duty_DutyId",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Employee_DutyId",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_BonusSalaryHistory_EmployeeId",
                table: "BonusSalaryHistory");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "StartTime",
                table: "ShiftInfo",
                type: "TIME",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "EndTime",
                table: "ShiftInfo",
                type: "TIME",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "ShiftInfo",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckOutTime",
                table: "Shift",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckInTime",
                table: "Shift",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "SalaryHistory",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PaidDate",
                table: "SalaryHistory",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "SalaryHistory",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAt",
                table: "HourHistory",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<int>(
                name: "TotalBonus",
                table: "BonusSalaryHistory",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "BonusSalaryHistory",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "BonusSalaryHistory");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "StartTime",
                table: "ShiftInfo",
                type: "time",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "TIME");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "EndTime",
                table: "ShiftInfo",
                type: "time",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "TIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "ShiftInfo",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckOutTime",
                table: "Shift",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckInTime",
                table: "Shift",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "SalaryHistory",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PaidDate",
                table: "SalaryHistory",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "SalaryHistory",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateAt",
                table: "HourHistory",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<int>(
                name: "TotalBonus",
                table: "BonusSalaryHistory",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_DutyId",
                table: "Employee",
                column: "DutyId");

            migrationBuilder.CreateIndex(
                name: "IX_BonusSalaryHistory_EmployeeId",
                table: "BonusSalaryHistory",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_BonusSalaryHistory_Employee_EmployeeId",
                table: "BonusSalaryHistory",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Duty_DutyId",
                table: "Employee",
                column: "DutyId",
                principalTable: "Duty",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
