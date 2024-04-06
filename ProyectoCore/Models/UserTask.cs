using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ProyectoCore.Models
{
    public class UserTask
    {
        [Key]
        public int Id { get; set; }
        
        public int UserId { get; set; }
        public User? User { get; set; }
        
        public int TaskId { get; set; }
        public ProjectTask? Task { get; set; }

        public string? TaskRole { get; set; }
    }
}
