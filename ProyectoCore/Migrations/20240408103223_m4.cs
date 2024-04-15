using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoCore.Migrations
{
    /// <inheritdoc />
    public partial class m4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
