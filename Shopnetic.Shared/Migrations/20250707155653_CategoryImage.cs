using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shopnetic.Shared.Migrations
{
    /// <inheritdoc />
    public partial class CategoryImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "CategoryImageData",
                table: "Categories",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryImageData",
                table: "Categories");
        }
    }
}
