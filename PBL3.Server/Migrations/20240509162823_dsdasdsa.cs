using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PBL3.Server.Migrations
{
    public partial class dsdasdsa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Nguyenocchoa",
                table: "Employee",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nguyenocchoa",
                table: "Employee");
        }
    }
}
