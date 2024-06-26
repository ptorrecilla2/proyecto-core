﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProyectoCore.Data;

#nullable disable

namespace ProyectoCore.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240415150400_M1")]
    partial class M1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ProyectoCore.Models.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Contact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Client", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "123 Main St",
                            City = "Anytown",
                            Contact = "John Smith",
                            Country = "USA",
                            Email = "info@techsolutions.com",
                            Name = "Tech Solutions Inc.",
                            Phone = "12345678"
                        },
                        new
                        {
                            Id = 2,
                            Address = "456 Elm St",
                            City = "Sometown",
                            Contact = "Alice Johnson",
                            Country = "UK",
                            Email = "info@globalinnovations.com",
                            Name = "Global Innovations Ltd.",
                            Phone = "87654321"
                        },
                        new
                        {
                            Id = 3,
                            Address = "789 Oak St",
                            City = "Othertown",
                            Contact = "Mohammed Khan",
                            Country = "Canada",
                            Email = "info@datasystems.com",
                            Name = "Data Systems Corp.",
                            Phone = "44556677"
                        },
                        new
                        {
                            Id = 4,
                            Address = "321 Cedar St",
                            City = "Smalltown",
                            Contact = "Maria Garcia",
                            Country = "Spain",
                            Email = "info@acme.com",
                            Name = "Acme Enterprises",
                            Phone = "33224466"
                        },
                        new
                        {
                            Id = 5,
                            Address = "987 Pine St",
                            City = "Metrocity",
                            Contact = "Chen Wei",
                            Country = "China",
                            Email = "info@sunrise.com",
                            Name = "Sunrise Technologies",
                            Phone = "86123456789"
                        });
                });

            modelBuilder.Entity("ProyectoCore.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("UserId");

                    b.ToTable("Comment", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Date = new DateTime(2024, 4, 14, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9224),
                            Description = "Great progress on the wireframes!",
                            TaskId = 1,
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Date = new DateTime(2024, 4, 14, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9228),
                            Description = "We need to finalize the backend architecture ASAP.",
                            TaskId = 2,
                            UserId = 2
                        },
                        new
                        {
                            Id = 3,
                            Date = new DateTime(2024, 4, 12, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9230),
                            Description = "Data collection going smoothly.",
                            TaskId = 3,
                            UserId = 3
                        },
                        new
                        {
                            Id = 4,
                            Date = new DateTime(2024, 4, 11, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9232),
                            Description = "UI/UX enhancements completed successfully.",
                            TaskId = 4,
                            UserId = 4
                        },
                        new
                        {
                            Id = 5,
                            Date = new DateTime(2024, 4, 14, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9235),
                            Description = "Testing phase started.",
                            TaskId = 5,
                            UserId = 5
                        });
                });

            modelBuilder.Entity("ProyectoCore.Models.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Read")
                        .HasColumnType("bit");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notification", (string)null);
                });

            modelBuilder.Entity("ProyectoCore.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ClientId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Project", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ClientId = 1,
                            Name = "Website Redesign"
                        },
                        new
                        {
                            Id = 2,
                            ClientId = 2,
                            Name = "Product Development"
                        },
                        new
                        {
                            Id = 3,
                            ClientId = 3,
                            Name = "Data Analytics Platform"
                        },
                        new
                        {
                            Id = 4,
                            ClientId = 4,
                            Name = "E-commerce Integration"
                        },
                        new
                        {
                            Id = 5,
                            ClientId = 5,
                            Name = "Mobile App Development"
                        });
                });

            modelBuilder.Entity("ProyectoCore.Models.ProjectTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("FinalDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("InitialDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<int>("ProjectId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectTask", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FinalDate = new DateTime(2024, 4, 22, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9181),
                            InitialDate = new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9130),
                            Name = "Design Wireframes",
                            Priority = 1,
                            ProjectId = 1,
                            Status = 1
                        },
                        new
                        {
                            Id = 2,
                            FinalDate = new DateTime(2024, 4, 29, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9189),
                            InitialDate = new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9187),
                            Name = "Backend Development",
                            Priority = 2,
                            ProjectId = 2,
                            Status = 0
                        },
                        new
                        {
                            Id = 3,
                            FinalDate = new DateTime(2024, 4, 25, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9193),
                            InitialDate = new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9191),
                            Name = "Data Collection",
                            Priority = 0,
                            ProjectId = 3,
                            Status = 1
                        },
                        new
                        {
                            Id = 4,
                            FinalDate = new DateTime(2024, 4, 20, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9197),
                            InitialDate = new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9195),
                            Name = "UI/UX Enhancement",
                            Priority = 1,
                            ProjectId = 4,
                            Status = 2
                        },
                        new
                        {
                            Id = 5,
                            FinalDate = new DateTime(2024, 4, 22, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9200),
                            InitialDate = new DateTime(2024, 4, 15, 17, 3, 59, 754, DateTimeKind.Local).AddTicks(9199),
                            Name = "Testing & Deployment",
                            Priority = 2,
                            ProjectId = 5,
                            Status = 0
                        });
                });

            modelBuilder.Entity("ProyectoCore.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Role", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Type = 0
                        },
                        new
                        {
                            Id = 2,
                            Type = 1
                        },
                        new
                        {
                            Id = 3,
                            Type = 3
                        },
                        new
                        {
                            Id = 4,
                            Type = 2
                        });
                });

            modelBuilder.Entity("ProyectoCore.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("User", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "admin@gmail.com",
                            LastName = "Admin",
                            Name = "Admin",
                            Password = "12345",
                            RoleId = 1
                        },
                        new
                        {
                            Id = 2,
                            Email = "javier@gmail.com",
                            LastName = "Vázquez",
                            Name = "Javier",
                            Password = "123456",
                            RoleId = 1
                        },
                        new
                        {
                            Id = 3,
                            Email = "camilo@gmail.com",
                            LastName = "Rodríguez",
                            Name = "Camilo",
                            Password = "123456",
                            RoleId = 3
                        },
                        new
                        {
                            Id = 4,
                            Email = "pablo@gmail.com",
                            LastName = "Torrecilla",
                            Name = "Pablo",
                            Password = "123456",
                            RoleId = 2
                        },
                        new
                        {
                            Id = 5,
                            Email = "sara@gmail",
                            LastName = "Pérez",
                            Name = "Sara",
                            Password = "123456",
                            RoleId = 2
                        },
                        new
                        {
                            Id = 6,
                            Email = "maria@gmail.com",
                            LastName = "García",
                            Name = "María",
                            Password = "123456",
                            RoleId = 2
                        },
                        new
                        {
                            Id = 7,
                            Email = "carlos@gmail.com",
                            LastName = "Gómez",
                            Name = "Carlos",
                            Password = "123456",
                            RoleId = 4
                        },
                        new
                        {
                            Id = 8,
                            Email = "ana@gmail.com",
                            LastName = "Martínez",
                            Name = "Ana",
                            Password = "123456",
                            RoleId = 4
                        },
                        new
                        {
                            Id = 9,
                            Email = "lucia@gmail.com",
                            LastName = "Sánchez",
                            Name = "Lucía",
                            Password = "123456",
                            RoleId = 4
                        });
                });

            modelBuilder.Entity("ProyectoCore.Models.UserTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.Property<string>("TaskRole")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("UserId");

                    b.ToTable("UserTask", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            TaskId = 1,
                            TaskRole = "UI/UX Designer",
                            UserId = 4
                        },
                        new
                        {
                            Id = 2,
                            TaskId = 2,
                            TaskRole = "Backend Developer",
                            UserId = 5
                        },
                        new
                        {
                            Id = 3,
                            TaskId = 3,
                            TaskRole = "Data Analyst",
                            UserId = 6
                        },
                        new
                        {
                            Id = 4,
                            TaskId = 4,
                            TaskRole = "UI/UX Designer",
                            UserId = 4
                        },
                        new
                        {
                            Id = 5,
                            TaskId = 5,
                            TaskRole = "QA Engineer",
                            UserId = 5
                        },
                        new
                        {
                            Id = 6,
                            TaskId = 1,
                            TaskRole = "Frontend Developer",
                            UserId = 7
                        },
                        new
                        {
                            Id = 7,
                            TaskId = 2,
                            TaskRole = "Project Manager",
                            UserId = 8
                        },
                        new
                        {
                            Id = 8,
                            TaskId = 3,
                            TaskRole = "Data Scientist",
                            UserId = 9
                        },
                        new
                        {
                            Id = 9,
                            TaskId = 4,
                            TaskRole = "Graphic Designer",
                            UserId = 7
                        },
                        new
                        {
                            Id = 10,
                            TaskId = 5,
                            TaskRole = "Mobile App Developer",
                            UserId = 8
                        });
                });

            modelBuilder.Entity("ProyectoCore.Models.Comment", b =>
                {
                    b.HasOne("ProyectoCore.Models.ProjectTask", "Task")
                        .WithMany()
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ProyectoCore.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ProyectoCore.Models.Notification", b =>
                {
                    b.HasOne("ProyectoCore.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ProyectoCore.Models.Project", b =>
                {
                    b.HasOne("ProyectoCore.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");
                });

            modelBuilder.Entity("ProyectoCore.Models.ProjectTask", b =>
                {
                    b.HasOne("ProyectoCore.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("ProyectoCore.Models.User", b =>
                {
                    b.HasOne("ProyectoCore.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("ProyectoCore.Models.UserTask", b =>
                {
                    b.HasOne("ProyectoCore.Models.ProjectTask", "Task")
                        .WithMany()
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ProyectoCore.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
