using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class AddStartTimeMapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Duty_DutyId",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Employee_DutyId",
                table: "Employee");

            migrationBuilder.AlterColumn<string>(
                name: "StartTime",
                table: "ShiftInfo",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "StartTime",
                table: "ShiftInfo",
                type: "time",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_DutyId",
                table: "Employee",
                column: "DutyId");

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
