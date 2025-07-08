using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shopnetic.Shared.Migrations
{
    /// <inheritdoc />
    public partial class RemovedUserSessions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartOwners_UserSessions_UserSessionId",
                table: "CartOwners");

            migrationBuilder.DropTable(
                name: "UserSessions");

            migrationBuilder.DropIndex(
                name: "IX_CartOwners_UserSessionId",
                table: "CartOwners");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserSessionId",
                table: "CartOwners",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "UserSessionId",
                table: "CartOwners",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateTable(
                name: "UserSessions",
                columns: table => new
                {
                    UserSessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ExpiresAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    IPAddress = table.Column<string>(type: "text", nullable: false),
                    LastActivity = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    RefreshTokenHash = table.Column<string>(type: "text", nullable: true),
                    RevocationReason = table.Column<string>(type: "text", nullable: true),
                    RevokedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    UserAgent = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSessions", x => x.UserSessionId);
                    table.ForeignKey(
                        name: "FK_UserSessions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartOwners_UserSessionId",
                table: "CartOwners",
                column: "UserSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSessions_UserId",
                table: "UserSessions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartOwners_UserSessions_UserSessionId",
                table: "CartOwners",
                column: "UserSessionId",
                principalTable: "UserSessions",
                principalColumn: "UserSessionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
