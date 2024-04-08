using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoCore.Migrations
{
    /// <inheritdoc />
    public partial class m3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 8, 10, 55, 17, 857, DateTimeKind.Local).AddTicks(1227));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 4, 8, 10, 55, 17, 857, DateTimeKind.Local).AddTicks(1229));

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 15, 10, 55, 17, 857, DateTimeKind.Local).AddTicks(1193), new DateTime(2024, 4, 8, 10, 55, 17, 857, DateTimeKind.Local).AddTicks(1144) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 13, 10, 55, 17, 857, DateTimeKind.Local).AddTicks(1201), new DateTime(2024, 4, 8, 10, 55, 17, 857, DateTimeKind.Local).AddTicks(1199) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 11, 10, 55, 17, 857, DateTimeKind.Local).AddTicks(1204), new DateTime(2024, 4, 8, 10, 55, 17, 857, DateTimeKind.Local).AddTicks(1203) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 6, 4, 8, 27, 927, DateTimeKind.Local).AddTicks(7672));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2024, 4, 6, 4, 8, 27, 927, DateTimeKind.Local).AddTicks(7676));

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 13, 4, 8, 27, 927, DateTimeKind.Local).AddTicks(7641), new DateTime(2024, 4, 6, 4, 8, 27, 927, DateTimeKind.Local).AddTicks(7579) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 11, 4, 8, 27, 927, DateTimeKind.Local).AddTicks(7648), new DateTime(2024, 4, 6, 4, 8, 27, 927, DateTimeKind.Local).AddTicks(7646) });

            migrationBuilder.UpdateData(
                table: "ProjectTask",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "FinalDate", "InitialDate" },
                values: new object[] { new DateTime(2024, 4, 9, 4, 8, 27, 927, DateTimeKind.Local).AddTicks(7652), new DateTime(2024, 4, 6, 4, 8, 27, 927, DateTimeKind.Local).AddTicks(7651) });
        }
    }
}
