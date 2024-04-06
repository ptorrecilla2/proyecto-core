using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ProyectoCore.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }
        public virtual User? User { get; set; }

        [ForeignKey("TaskId")]
        public int TaskId { get; set; }
        public virtual ProjectTask? Task { get; set; }

    }
}