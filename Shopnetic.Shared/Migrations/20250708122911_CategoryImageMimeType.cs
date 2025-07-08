using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shopnetic.Shared.Migrations
{
    /// <inheritdoc />
    public partial class CategoryImageMimeType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CategoryImageMimeType",
                table: "Categories",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryImageMimeType",
                table: "Categories");
        }
    }
}
