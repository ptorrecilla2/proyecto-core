namespace ProyectoCore.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Url { get; set; }
        public bool Read { get; set;}
        public DateTime Date { get; set; }
        public int UserId { get; set;}
        public User? User { get; set; }
    }
}
