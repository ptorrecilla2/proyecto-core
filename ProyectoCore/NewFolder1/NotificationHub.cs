using Microsoft.AspNetCore.SignalR;
using ProyectoCore.Models;

namespace ProyectoCore.NewFolder1
{
    public class NotificationHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }

}
