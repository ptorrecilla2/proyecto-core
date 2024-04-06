using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace ProyectoCore.Models
{
    public class ProjectTask
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime InitialDate { get; set; }
        public DateTime FinalDate { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonStringEnumConverter))]
        public Priority Priority { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonStringEnumConverter))]
        public Status Status { get; set; }

        [ForeignKey("ProjectId")] //FK
        public int ProjectId { get; set; }
        public virtual Project? Project { get; set; } //Navigation Property

        

        
    }
    public class ProjectTaskDTO
    {
        public ProjectTask ProjectTask { get; set; }
        public ICollection<UserTask> Participants { get; set; }
    }   
    public enum Priority
    {

        Low,
        Medium,
        High
    }

    public enum Status
    {
        Pending,
        InProgress,
        Done
    }
}
