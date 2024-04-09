using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoCore.Data;
using ProyectoCore.Models;

namespace ProyectoCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
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
            //add notification to the user that a comment was edited
            Notification notification = new Notification
            {
                Title = "Comment Edited",
                Message = "A comment was edited",
                Url = "http://localhost:3000/tareas/" + comment.TaskId,
                UserId = comment.UserId,
                Date = DateTime.Now
            };
            try
            {
                await _context.SaveChangesAsync();
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
            //add notification to the user that a comment was added
            Notification notification = new Notification
            {
                Title = "Comment Added",
                Message = "A comment was added to a task you are assigned to",
                Url = "http://localhost:3000/tareas/" + comment.TaskId,
                UserId = user.Id,
                Date = DateTime.Now
            };
            _context.Notifications.Add(notification);
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

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
