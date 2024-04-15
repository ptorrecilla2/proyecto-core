using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProyectoCore.Migrations
{
    /// <inheritdoc />
    public partial class M1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Project_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTask",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InitialDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FinalDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTask_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
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

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_ProjectTask_TaskId",
                        column: x => x.TaskId,
                        principalTable: "ProjectTask",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comment_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTask",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TaskId = table.Column<int>(type: "int", nullable: false),
                    TaskRole = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTask_ProjectTask_TaskId",
                        column: x => x.TaskId,
                        principalTable: "ProjectTask",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTask_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Client",
                columns: new[] { "Id", "Address", "City", "Contact", "Country", "Email", "Name", "Phone" },
                values: new object[,]
                {
                    { 1, "123 Main St", "Anytown", "John Smith", "USA", "info@techsolutions.com", "Tech Solutions Inc.", "12345678" },
                    { 2, "456 Elm St", "Sometown", "Alice Johnson", "UK", "info@globalinnovations.com", "Global Innovations Ltd.", "87654321" },
                    { 3, "789 Oak St", "Othertown", "Mohammed Khan", "Canada", "info@datasystems.com", "Data Systems Corp.", "44556677" },
                    { 4, "321 Cedar St", "Smalltown", "Maria Garcia", "Spain", "info@acme.com", "Acme Enterprises", "33224466" },
                    { 5, "987 Pine St", "Metrocity", "Chen Wei", "China", "info@sunrise.com", "Sunrise Technologies", "86123456789" }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Type" },
                values: new object[,]
                {
                    { 1, 0 },
                    { 2, 1 },
                    { 3, 3 },
                    { 4, 2 }
                });

            migrationBuilder.InsertData(
                table: "Project",
                columns: new[] { "Id", "ClientId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Website Redesign" },
                    { 2, 2, "Product Development" },
                    { 3, 3, "Data Analytics Platform" },
                    { 4, 4, "E-commerce Integration" },
                    { 5, 5, "Mobile App Development" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Email", "LastName", "Name", "Password", "RoleId" },
                values: new object[,]
                {
                    { 1, "admin@gmail.com", "Admin", "Admin", "12345", 1 },
                    { 2, "javier@gmail.com", "Vázquez", "Javier", "123456", 1 },
                    { 3, "camilo@gmail.com", "Rodríguez", "Camilo", "123456", 3 },
                    { 4, "pablo@gmail.com", "Torrecilla", "Pablo", "123456", 2 },
                    { 5, "sara@gmail", "Pérez", "Sara", "123456", 2 },
                    { 6, "maria@gmail.com", "García", "María", "123456", 2 },
                    { 7, "carlos@gmail.com", "Gómez", "Carlos", "123456", 4 },
                    { 8, "ana@gmail.com", "Martínez", "Ana", "123456", 4 },
                    { 9, "lucia@gmail.com", "Sánchez", "Lucía", "123456", 4 }
                });

            migrationBuilder.InsertData(
                table: "ProjectTask",
                columns: new[] { "Id", "FinalDate", "InitialDate", "Name", "Priority", "ProjectId", "Status" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 4, 22, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9181), new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9130), "Design Wireframes", 1, 1, 1 },
                    { 2, new DateTime(2024, 4, 29, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9189), new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9187), "Backend Development", 2, 2, 0 },
                    { 3, new DateTime(2024, 4, 25, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9193), new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9191), "Data Collection", 0, 3, 1 },
                    { 4, new DateTime(2024, 4, 20, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9197), new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9195), "UI/UX Enhancement", 1, 4, 2 },
                    { 5, new DateTime(2024, 4, 22, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9200), new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9199), "Testing & Deployment", 2, 5, 0 }
                });

            migrationBuilder.InsertData(
                table: "Comment",
                columns: new[] { "Id", "Date", "Description", "TaskId", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 4, 14, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9224), "Great progress on the wireframes!", 1, 1 },
                    { 2, new DateTime(2024, 4, 14, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9228), "We need to finalize the backend architecture ASAP.", 2, 2 },
                    { 3, new DateTime(2024, 4, 12, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9230), "Data collection going smoothly.", 3, 3 },
                    { 4, new DateTime(2024, 4, 11, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9232), "UI/UX enhancements completed successfully.", 4, 4 },
                    { 5, new DateTime(2024, 4, 14, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9235), "Testing phase started.", 5, 5 }
                });

            migrationBuilder.InsertData(
                table: "UserTask",
                columns: new[] { "Id", "TaskId", "TaskRole", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "UI/UX Designer", 4 },
                    { 2, 2, "Backend Developer", 5 },
                    { 3, 3, "Data Analyst", 6 },
                    { 4, 4, "UI/UX Designer", 4 },
                    { 5, 5, "QA Engineer", 5 },
                    { 6, 1, "Frontend Developer", 7 },
                    { 7, 2, "Project Manager", 8 },
                    { 8, 3, "Data Scientist", 9 },
                    { 9, 4, "Graphic Designer", 7 },
                    { 10, 5, "Mobile App Developer", 8 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_TaskId",
                table: "Comment",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_UserId",
                table: "Comment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_UserId",
                table: "Notification",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_ClientId",
                table: "Project",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTask_ProjectId",
                table: "ProjectTask",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTask_TaskId",
                table: "UserTask",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTask_UserId",
                table: "UserTask",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "UserTask");

            migrationBuilder.DropTable(
                name: "ProjectTask");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Client");
        }
    }
}
