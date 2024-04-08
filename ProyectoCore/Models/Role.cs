using System.Text.Json.Serialization;

namespace ProyectoCore.Models
{
    public class Role
    {
        public int Id { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonStringEnumConverter))]
        public RoleType Type { get; set; }
    }
    public enum RoleType
    {
        Admin,
        Dev,
        Manager,
        Tester
    }
}