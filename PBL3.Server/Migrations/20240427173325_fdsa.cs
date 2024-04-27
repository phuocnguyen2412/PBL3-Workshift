using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class fdsa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Shift_EmployeeId",
                table: "Employee");

            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Violate_EmployeeId",
                table: "Employee");

            migrationBuilder.CreateIndex(
                name: "IX_Violate_EmployeeId",
                table: "Violate",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Shift_EmployeeId",
                table: "Shift",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shift_Employee_EmployeeId",
                table: "Shift",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Violate_Employee_EmployeeId",
                table: "Violate",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shift_Employee_EmployeeId",
                table: "Shift");

            migrationBuilder.DropForeignKey(
                name: "FK_Violate_Employee_EmployeeId",
                table: "Violate");

            migrationBuilder.DropIndex(
                name: "IX_Violate_EmployeeId",
                table: "Violate");

            migrationBuilder.DropIndex(
                name: "IX_Shift_EmployeeId",
                table: "Shift");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Shift_EmployeeId",
                table: "Employee",
                column: "EmployeeId",
                principalTable: "Shift",
                principalColumn: "ShiftId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Violate_EmployeeId",
                table: "Employee",
                column: "EmployeeId",
                principalTable: "Violate",
                principalColumn: "ViolateId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
