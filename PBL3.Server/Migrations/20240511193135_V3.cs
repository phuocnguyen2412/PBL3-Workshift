using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shift_ShiftInfo_EmployeeId",
                table: "Shift");

            migrationBuilder.CreateIndex(
                name: "IX_Shift_ShiftInfoId",
                table: "Shift",
                column: "ShiftInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shift_ShiftInfo_ShiftInfoId",
                table: "Shift",
                column: "ShiftInfoId",
                principalTable: "ShiftInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shift_ShiftInfo_ShiftInfoId",
                table: "Shift");

            migrationBuilder.DropIndex(
                name: "IX_Shift_ShiftInfoId",
                table: "Shift");

            migrationBuilder.AddForeignKey(
                name: "FK_Shift_ShiftInfo_EmployeeId",
                table: "Shift",
                column: "EmployeeId",
                principalTable: "ShiftInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
