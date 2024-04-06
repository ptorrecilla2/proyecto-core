using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoCore.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }

        [ForeignKey("ClientId")]
        public int ClientId { get; set; }
        public virtual Client? Client { get; set; }
        
    }
}