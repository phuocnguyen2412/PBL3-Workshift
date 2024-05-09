using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class dâsđsáda : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Duty_DutyId",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Employee_DutyId",
                table: "Employee");
        }
    }
}
