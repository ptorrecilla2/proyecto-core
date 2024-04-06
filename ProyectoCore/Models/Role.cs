namespace ProyectoCore.Models
{
    public class Role
    {
        public int Id { get; set; }
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