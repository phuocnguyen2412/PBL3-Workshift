using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class dáddssad : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Account",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "Account");
        }
    }
}
