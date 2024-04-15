using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoCore.Migrations
{
    /// <inheritdoc />
    public partial class m5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Read = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notification_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 9, 11, 41, 56, 237, DateTimeKind.Local).AddTicks(9945));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 4, 9, 11, 41, 56, 237, DateTimeKind.Local).AddTicks(9950));

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 16, 11, 41, 56, 237, DateTimeKind.Local).AddTicks(9890), new DateTime(2024, 4, 9, 11, 41, 56, 237, DateTimeKind.Local).AddTicks(9832) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 14, 11, 41, 56, 237, DateTimeKind.Local).AddTicks(9904), new DateTime(2024, 4, 9, 11, 41, 56, 237, DateTimeKind.Local).AddTicks(9901) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 12, 11, 41, 56, 237, DateTimeKind.Local).AddTicks(9908), new DateTime(2024, 4, 9, 11, 41, 56, 237, DateTimeKind.Local).AddTicks(9907) });

            migrationBuilder.CreateIndex(
                name: "IX_Notification_UserId",
                table: "Notification",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 8, 12, 32, 21, 198, DateTimeKind.Local).AddTicks(3828));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 4, 8, 12, 32, 21, 198, DateTimeKind.Local).AddTicks(3831));

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 15, 12, 32, 21, 198, DateTimeKind.Local).AddTicks(3794), new DateTime(2024, 4, 8, 12, 32, 21, 198, DateTimeKind.Local).AddTicks(3735) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 13, 12, 32, 21, 198, DateTimeKind.Local).AddTicks(3801), new DateTime(2024, 4, 8, 12, 32, 21, 198, DateTimeKind.Local).AddTicks(3799) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 11, 12, 32, 21, 198, DateTimeKind.Local).AddTicks(3804), new DateTime(2024, 4, 8, 12, 32, 21, 198, DateTimeKind.Local).AddTicks(3803) });
        }
    }
}
