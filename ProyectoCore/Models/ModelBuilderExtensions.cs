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
                new User { Id = 2, Name = "Javier", LastName = "Vázquez", Email = "javier@gmail.com", Password = "123456", RoleId = 1 },
                new User { Id = 3, Name = "Camilo", LastName = "Rodríguez", Email = "camilo@gmail.com", Password = "123456", RoleId = 3 },
                new User { Id = 4, Name = "Pablo", LastName = "Torrecilla", Email = "pablo@gmail.com", Password = "123456", RoleId = 2 },
                new User { Id = 5, Name = "Sara", LastName = "Pérez", Email = "sara@gmail", Password = "123456", RoleId = 2 },
                new User { Id = 6, Name = "María", LastName = "García", Email = "maria@gmail.com", Password = "123456", RoleId = 2 },
                new User { Id = 7, Name = "Carlos", LastName = "Gómez", Email = "carlos@gmail.com", Password = "123456", RoleId = 4 },
                new User { Id = 8, Name = "Ana", LastName = "Martínez", Email = "ana@gmail.com", Password = "123456", RoleId = 4 },
                new User { Id = 9, Name = "Lucía", LastName = "Sánchez", Email = "lucia@gmail.com", Password = "123456", RoleId = 4 }
            );


            modelBuilder.Entity<Client>().HasData(
               new Client { Id = 1, Name = "Tech Solutions Inc.", Email = "info@techsolutions.com", Phone = "12345678", Address = "123 Main St", City = "Anytown", Country = "USA", Contact = "John Smith" },
               new Client { Id = 2, Name = "Global Innovations Ltd.", Email = "info@globalinnovations.com", Phone = "87654321", Address = "456 Elm St", City = "Sometown", Country = "UK", Contact = "Alice Johnson" },
               new Client { Id = 3, Name = "Data Systems Corp.", Email = "info@datasystems.com", Phone = "44556677", Address = "789 Oak St", City = "Othertown", Country = "Canada", Contact = "Mohammed Khan" },
               new Client { Id = 4, Name = "Acme Enterprises", Email = "info@acme.com", Phone = "33224466", Address = "321 Cedar St", City = "Smalltown", Country = "Spain", Contact = "Maria Garcia" },
               new Client { Id = 5, Name = "Sunrise Technologies", Email = "info@sunrise.com", Phone = "86123456789", Address = "987 Pine St", City = "Metrocity", Country = "China", Contact = "Chen Wei" }

            );


            modelBuilder.Entity<Project>().HasData(
                new Project { Id = 1, Name = "Website Redesign", ClientId = 1 }, // Proyecto para Tech Solutions Inc.
                new Project { Id = 2, Name = "Product Development", ClientId = 2 }, // Proyecto para Global Innovations Ltd.
                new Project { Id = 3, Name = "Data Analytics Platform", ClientId = 3 }, // Proyecto para Data Systems Corp.
                new Project { Id = 4, Name = "E-commerce Integration", ClientId = 4 }, // Proyecto para Acme Enterprises
                new Project { Id = 5, Name = "Mobile App Development", ClientId = 5 } // Proyecto para Sunrise Technologies

            );


            modelBuilder.Entity<ProjectTask>().HasData(
               new ProjectTask { Id = 1, Name = "Design Wireframes", InitialDate = DateTime.Now, FinalDate = DateTime.Now.AddDays(7), Priority = Priority.Medium, Status = Status.InProgress, ProjectId = 1 }, // Tarea para el proyecto "Website Redesign"
               new ProjectTask { Id = 2, Name = "Backend Development", InitialDate = DateTime.Now, FinalDate = DateTime.Now.AddDays(14), Priority = Priority.High, Status = Status.Pending, ProjectId = 2 }, // Tarea para el proyecto "Product Development"
               new ProjectTask { Id = 3, Name = "Data Collection", InitialDate = DateTime.Now, FinalDate = DateTime.Now.AddDays(10), Priority = Priority.Low, Status = Status.InProgress, ProjectId = 3 }, // Tarea para el proyecto "Data Analytics Platform"
               new ProjectTask { Id = 4, Name = "UI/UX Enhancement", InitialDate = DateTime.Now, FinalDate = DateTime.Now.AddDays(5), Priority = Priority.Medium, Status = Status.Done, ProjectId = 4 }, // Tarea para el proyecto "E-commerce Integration"
               new ProjectTask { Id = 5, Name = "Testing & Deployment", InitialDate = DateTime.Now, FinalDate = DateTime.Now.AddDays(7), Priority = Priority.High, Status = Status.Pending, ProjectId = 5 } // Tarea para el proyecto "Mobile App Development"


            );


            modelBuilder.Entity<Comment>().HasData(
                new Comment { Id = 1, Description = "Great progress on the wireframes!", Date = DateTime.Now.AddDays(-1), UserId = 1, TaskId = 1 }, // Comentario sobre el avance en los wireframes del proyecto "Website Redesign"
                new Comment { Id = 2, Description = "We need to finalize the backend architecture ASAP.", Date = DateTime.Now.AddDays(-1), UserId = 2, TaskId = 2 }, // Comentario sobre la necesidad de finalizar la arquitectura backend del proyecto "Product Development"
                new Comment { Id = 3, Description = "Data collection going smoothly.", Date = DateTime.Now.AddDays(-3), UserId = 3, TaskId = 3 }, // Comentario sobre el progreso de la recopilación de datos en el proyecto "Data Analytics Platform"
                new Comment { Id = 4, Description = "UI/UX enhancements completed successfully.", Date = DateTime.Now.AddDays(-4), UserId = 4, TaskId = 4 }, // Comentario sobre la finalización exitosa de las mejoras de UI/UX en el proyecto "E-commerce Integration"
                new Comment { Id = 5, Description = "Testing phase started.", Date = DateTime.Now.AddDays(-1), UserId = 5, TaskId = 5 } // Comentario sobre el inicio de la fase de pruebas en el proyecto "Mobile App Development"

            );

            modelBuilder.Entity<UserTask>().HasData(
                new UserTask { Id = 1, UserId = 4, TaskId = 1, TaskRole = "UI/UX Designer" }, // Usuario asignado como diseñador UI/UX para la tarea de wireframes en el proyecto "Website Redesign"
                new UserTask { Id = 2, UserId = 5, TaskId = 2, TaskRole = "Backend Developer" }, // Usuario asignado como desarrollador backend para el proyecto "Product Development"
                new UserTask { Id = 3, UserId = 6, TaskId = 3, TaskRole = "Data Analyst" }, // Usuario asignado como analista de datos para el proyecto "Data Analytics Platform"
                new UserTask { Id = 4, UserId = 4, TaskId = 4, TaskRole = "UI/UX Designer" }, // Usuario asignado como diseñador UI/UX para el proyecto "E-commerce Integration"
                new UserTask { Id = 5, UserId = 5, TaskId = 5, TaskRole = "QA Engineer" }, // Usuario asignado como ingeniero de QA para el proyecto "Mobile App Development"
                new UserTask { Id = 6, UserId = 7, TaskId = 1, TaskRole = "Frontend Developer" }, // Usuario asignado como desarrollador frontend para la tarea de wireframes en el proyecto "Website Redesign"
                new UserTask { Id = 7, UserId = 8, TaskId = 2, TaskRole = "Project Manager" }, // Usuario asignado como gerente de proyecto para el proyecto "Product Development"
                new UserTask { Id = 8, UserId = 9, TaskId = 3, TaskRole = "Data Scientist" }, // Usuario asignado como científico de datos para el proyecto "Data Analytics Platform"
                new UserTask { Id = 9, UserId = 7, TaskId = 4, TaskRole = "Graphic Designer" }, // Usuario asignado como diseñador gráfico para el proyecto "E-commerce Integration"
                new UserTask { Id = 10, UserId = 8, TaskId = 5, TaskRole = "Mobile App Developer" } // Usuario asignado como desarrollador de aplicaciones móviles para el proyecto "Mobile App Development"
                );


        }

    }
}
