using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProyectoCore.Migrations
{
    /// <inheritdoc />
    public partial class m7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Notification",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Notification",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Notification",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 9, 12, 48, 13, 577, DateTimeKind.Local).AddTicks(3944));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 4, 9, 12, 48, 13, 577, DateTimeKind.Local).AddTicks(3947));

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 16, 12, 48, 13, 577, DateTimeKind.Local).AddTicks(3858), new DateTime(2024, 4, 9, 12, 48, 13, 577, DateTimeKind.Local).AddTicks(3801) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 14, 12, 48, 13, 577, DateTimeKind.Local).AddTicks(3865), new DateTime(2024, 4, 9, 12, 48, 13, 577, DateTimeKind.Local).AddTicks(3863) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 12, 12, 48, 13, 577, DateTimeKind.Local).AddTicks(3919), new DateTime(2024, 4, 9, 12, 48, 13, 577, DateTimeKind.Local).AddTicks(3917) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Notification");

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 9, 12, 43, 29, 560, DateTimeKind.Local).AddTicks(2465));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 4, 9, 12, 43, 29, 560, DateTimeKind.Local).AddTicks(2468));

            migrationBuilder.InsertData(
                table: "Notification",
                columns: new[] { "Id", "Message", "Read", "Title", "Url", "UserId" },
                values: new object[,]
                {
                    { 1, "Mensaje de notificación 1", false, "Notificación 1", "https://www.google.com", 2 },
                    { 2, "Mensaje de notificación 2", false, "Notificación 2", "https://www.google.com", 2 }
                });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 16, 12, 43, 29, 560, DateTimeKind.Local).AddTicks(2426), new DateTime(2024, 4, 9, 12, 43, 29, 560, DateTimeKind.Local).AddTicks(2373) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 14, 12, 43, 29, 560, DateTimeKind.Local).AddTicks(2434), new DateTime(2024, 4, 9, 12, 43, 29, 560, DateTimeKind.Local).AddTicks(2433) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 12, 12, 43, 29, 560, DateTimeKind.Local).AddTicks(2438), new DateTime(2024, 4, 9, 12, 43, 29, 560, DateTimeKind.Local).AddTicks(2436) });
        }
    }
}
