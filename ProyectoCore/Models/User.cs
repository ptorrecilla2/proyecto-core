using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace ProyectoCore.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        [ForeignKey("RoleId")]
        public int RoleId { get; set; }
        public virtual Role? Role { get; set; }
        
    }
}