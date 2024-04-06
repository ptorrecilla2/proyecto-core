using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace ProyectoCore.Models
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Type = RoleType.Admin },
                new Role { Id = 2, Type = RoleType.Dev },
                new Role { Id = 3, Type = RoleType.Tester },
                new Role { Id = 4, Type = RoleType.Manager }
            );


            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "Admin", LastName = "Admin", Email = "admin@gmail.com", Password = "12345", RoleId = 1 },
                new User { Id = 2, Name = "Juan", LastName = "García", Email = "juan@gmail.com", Password = "123456", RoleId = 2 },
                new User { Id = 3, Name = "Ana", LastName = "González", Email = "ana@gmail.com", Password = "123456", RoleId = 3 },
                new User { Id = 4, Name = "María", LastName = "Rodríguez", Email = "maria@gmail.com", Password = "123456", RoleId = 4 },
                new User { Id = 5, Name = "Sara", LastName = "Pérez", Email = "sara@gmail", Password = "123456", RoleId = 2 }
            );


            modelBuilder.Entity<Client>().HasData(
                new Client { Id = 1, Name = "EmpresaUno", Email = "empresauno@gmail.com", Phone = "123456789", Address = "Calle Alta, 1", City = "Madrid", Country = "España", Contact = "empresauno@gmail.com" },
                new Client { Id = 2, Name = "EmpresaDos", Email = "empresados@gmail.com", Phone = "987654321", Address = "Calle Baja, 2", City = "Barcelona", Country = "España", Contact = "empresados@gmail.com" },
                new Client { Id = 3, Name = "EmpresaTres", Email = "empresatres@gmail.com", Phone = "123456789", Address = "Calle Media, 3", City = "Valencia", Country = "España", Contact = "empresatres@gmail.com" }


            );


            modelBuilder.Entity<Project>().HasData(
                new Project { Id = 1, Name = "Project1", ClientId = 1 },
                new Project { Id = 2, Name = "Project2", ClientId = 2 },
                new Project { Id = 3, Name = "Project3", ClientId = 3 }

            );


            modelBuilder.Entity<ProjectTask>().HasData(
                new ProjectTask { Id = 1, Name = "Task1", InitialDate = DateTime.Now, FinalDate = DateTime.Now.AddDays(7), Priority = Priority.High, Status = Status.Pending, ProjectId = 1 },
                new ProjectTask { Id = 2, Name = "Task2", InitialDate = DateTime.Now, FinalDate = DateTime.Now.AddDays(5), Priority = Priority.Medium, Status = Status.InProgress, ProjectId = 2 },
                new ProjectTask { Id = 3, Name = "Task3", InitialDate = DateTime.Now, FinalDate = DateTime.Now.AddDays(3), Priority = Priority.Low, Status = Status.Done, ProjectId = 3 }


            );


            modelBuilder.Entity<Comment>().HasData(
                new Comment { Id = 1, Description = "Comentario de prueba 1", Date = DateTime.Now, UserId = 1, TaskId = 1 },
                new Comment { Id = 2, Description = "Comentario de prueba 2", Date = DateTime.Now, UserId = 2, TaskId = 2 }

            ); 

            modelBuilder.Entity<UserTask>().HasData(
                new UserTask { Id= 1, UserId = 2, TaskId = 1, TaskRole="Dev" },
                new UserTask { Id = 2, UserId = 3, TaskId = 1, TaskRole="Manager" },
                new UserTask { Id = 3, UserId = 2, TaskId = 2, TaskRole="Dev" },
                new UserTask { Id = 4, UserId = 4, TaskId = 2, TaskRole="Tester" }
                );
        }
                                                      
    }
}

