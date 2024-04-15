using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ProyectoCore.Data;
using ProyectoCore.Models;
using ProyectoCore.NewFolder1;

namespace ProyectoCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<NotificationHub> _notificationHubContext;

        public CommentsController(AppDbContext context, IHubContext<NotificationHub> notificationHubContext)
        {
            _context = context;
            _notificationHubContext = notificationHubContext;
        }
        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Comment>>> GetComment(int id)
        {
            var comments = await _context.Comments.Where(c=>c.TaskId == id).ToListAsync();

            if (comments == null)
            {
                return NotFound();
            }
            foreach(var comment in comments)
            {
                comment.User = await _context.Users.FindAsync(comment.UserId);
            }
            return comments;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;
            //search for task
            var task = await _context.ProjectTasks.FindAsync(comment.TaskId);
            //add notification for each user of the task
            var userTasks = await _context.UserTasks.Where(u => u.TaskId == comment.TaskId).ToListAsync();
            var notis = new List<Notification>();
            foreach (var userTask in userTasks)
            {
                Notification notification = new Notification
                {
                    Title = "Comentario editado",
                    Message = "Fue editado un comentario de la tarea: " + task.Name,
                    Url = "http://localhost:3000/tareas/" + comment.TaskId,
                    UserId = userTask.UserId,
                    Date = DateTime.Now
                };
                
                _context.Notifications.Add(notification);
                notis.Add(notification);
                
            }


            try
            {
                await _context.SaveChangesAsync();
                foreach (var noti in notis)
                {
                    await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", noti);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            //antes de guardar el comentario, se debe verificar que el usuario y la tarea existan
            var user = await _context.Users.FindAsync(comment.UserId);
            if (user == null)
            {
                return BadRequest("El usuario no existe");
            }
            //la tarea debe existir

            var task = await _context.ProjectTasks.FindAsync(comment.TaskId);
            if (task == null)
            {
                return BadRequest("La tarea no existe");
            }
            comment.User = user;

            //add notification for each user of the task
            var userTasks = await _context.UserTasks.Where(u => u.TaskId == comment.TaskId).ToListAsync();
            var notis = new List<Notification>();
            foreach (var userTask in userTasks)
            {
                Notification notification = new Notification
                {
                    Title = "Comentario añadido",
                    Message = "Un comentario fue añadido a la tarea: " + task.Name,
                    Url = "http://localhost:3000/tareas/" + comment.TaskId,
                    UserId = userTask.UserId,
                    Date = DateTime.Now
                };
                notis.Add(notification);
                _context.Notifications.Add(notification);
            }
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            foreach (var noti in notis)
            {
                await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", noti);
            }
            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
