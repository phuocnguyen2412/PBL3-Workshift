using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class addok : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BonusSalaryHistory_Employee_EmployeeId",
                table: "BonusSalaryHistory");

            migrationBuilder.DropIndex(
                name: "IX_BonusSalaryHistory_EmployeeId",
                table: "BonusSalaryHistory");
        }
    }
}
