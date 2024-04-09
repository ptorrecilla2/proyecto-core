using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProyectoCore.Migrations
{
    /// <inheritdoc />
    public partial class m6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Notification",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Notification",
                keyColumn: "Id",
                keyValue: 2);

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
        }
    }
}
