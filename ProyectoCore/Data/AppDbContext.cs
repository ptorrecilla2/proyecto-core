using Microsoft.EntityFrameworkCore;
using ProyectoCore.Models;

namespace ProyectoCore.Data
{
    public class AppDbContext : DbContext
    {
        //Constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        //Añadimos las tablas
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }        
        public DbSet<Comment> Comments { get; set; }

        public DbSet<UserTask> UserTasks { get; set; }

        //Quitamos la pluralidad de las tablas
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Client>().ToTable("Client");
            modelBuilder.Entity<Project>().ToTable("Project");
            modelBuilder.Entity<Role>().ToTable("Role");
            modelBuilder.Entity<ProjectTask>().ToTable("ProjectTask");
            modelBuilder.Entity<Comment>().ToTable("Comment");
            modelBuilder.Entity<UserTask>().ToTable("UserTask");
            modelBuilder.Seed();
            base.OnModelCreating(modelBuilder);
        }

        

    }
}
