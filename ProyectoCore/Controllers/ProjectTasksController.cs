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
    public class ProjectTasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<NotificationHub> _notificationHubContext;

        public ProjectTasksController(AppDbContext context, IHubContext<NotificationHub> notificationHubContext)
        {
            _context = context;
            _notificationHubContext = notificationHubContext;
        }

        // GET: api/ProjectTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTask>>> GetProjectTasks()
        {
            return await _context.ProjectTasks.ToListAsync();
        }

        // GET: api/ProjectTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTaskDTO>> GetProjectTask(int id) { 
        
            
            var projectTask = await _context.ProjectTasks.FindAsync(id);

            
            if (projectTask == null)
            {
                return NotFound();
            }
            
            projectTask.Project = await _context.Projects.FindAsync(projectTask.ProjectId);
            //buscar  el dev y el manager a partir de la tabla UserTask
            var participants = await _context.UserTasks.Where(u => u.TaskId == id).Include(u=>u.User).Include(u => u.User.Role).ToListAsync();

            
            return new ProjectTaskDTO{ ProjectTask=projectTask,Participants=participants};
        }
        // GET: api/ProjectTasks/5
        [HttpGet("{id}&{idProject}")]
        public async Task<ActionResult<IEnumerable<ProjectTask>>> GetProjectTask(int id,int idProject)
        {
            

            var projectTask = await _context.ProjectTasks.Where(p=>p.ProjectId == idProject).ToListAsync() ;


            if (projectTask == null)
            {
                return NotFound();
            }

            return projectTask;
        }

        // PUT: api/ProjectTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectTask(int id, ProjectTask projectTask)
        {
            if (id != projectTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectTask).State = EntityState.Modified;
            //add notification saying a task was modified to both users using userTask table
            var userTasks = await _context.UserTasks.Where(u => u.TaskId == id).ToListAsync();
            var notis = new List<Notification>();
            foreach (var userTask in userTasks)
            {
                Notification notification = new Notification
                {
                    Title = "Tarea Modificada",
                    Message = "Fue modificada la tarea: "+ projectTask.Name,
                    Url = "http://localhost:3000/tareas/" + id,
                    UserId = userTask.UserId,
                    Date=DateTime.Now
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
                if (!ProjectTaskExists(id))
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

        // POST: api/ProjectTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProjectTask>> PostProjectTask(ProjectTask projectTask)
        {
            if (projectTask.ProjectId == null && projectTask.Project.Id == null)
            {
                return BadRequest();
            }
            
            projectTask.ProjectId = projectTask.Project.Id;
            _context.ProjectTasks.Add(projectTask);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction("GetProjectTask", new { id = projectTask.Id }, projectTask);
        }

        [HttpPost("saveTask")]
        public async Task<ActionResult<ProjectTask>> SaveProjectTask(int idDev, int idManager, [FromBody] ProjectTask projectTask)
        {
            if (projectTask.ProjectId == null && projectTask.Project.Id == null)
            {
                return BadRequest();
            }
            projectTask.ProjectId = projectTask.Project.Id;
            var project = await _context.Projects.FindAsync(projectTask.ProjectId);
            projectTask.Project = project;
            
            _context.ProjectTasks.Add(projectTask);
            await _context.SaveChangesAsync();

            // Obtener el ID de la tarea creada
            int createdTaskId = projectTask.Id;

            // Crear instancias de UserTask para el desarrollador y el gerente
            UserTask userTaskDev = new UserTask
            {
                UserId = idDev,
                TaskId = createdTaskId,
                TaskRole = "Dev"
            };

            UserTask userTaskManager = new UserTask
            {
                UserId = idManager,
                TaskId = createdTaskId,
                TaskRole = "Manager"
            };

            // Agregar las nuevas instancias de UserTask al contexto y guardar los cambios
            _context.UserTasks.AddRange(userTaskDev, userTaskManager);

            //add notifications to the users that rediret to the task
            Notification notificationDev = new Notification
            {
                Title = "Nueva tarea",
                Message = "Te fue asignada la tarea "+ projectTask.Name,
                Url = "http://localhost:3000/tareas/" + createdTaskId,
                UserId = idDev,
                Date = DateTime.Now
            };

            Notification notificationManager = new Notification
            {
                Title = "Nueva tarea",
                Message = "Te fue asignada la tarea: " + projectTask.Name,
                Url = "/task/" + createdTaskId,
                UserId = idManager,
                Date = DateTime.Now
            };
            await _context.Notifications.AddRangeAsync(notificationDev, notificationManager);
            await _context.SaveChangesAsync();
            await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", notificationDev);
            await _notificationHubContext.Clients.All.SendAsync("ReceiveNotification", notificationManager);
            // Devolver la tarea creada con su ID
            return CreatedAtAction("GetProjectTask", new { id = createdTaskId }, projectTask);
        }





        // DELETE: api/ProjectTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectTask(int id)
        {
            var projectTask = await _context.ProjectTasks.FindAsync(id);
            if (projectTask == null)
            {
                return NotFound();
            }

            _context.ProjectTasks.Remove(projectTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectTaskExists(int id)
        {
            return _context.ProjectTasks.Any(e => e.Id == id);
        }

        [HttpPost("getProjectTaskOptions")]
        public async Task<IActionResult> GetProjectTaskOptions()
        {
            var projects = await _context.Projects.ToListAsync();
            var statuses = Enum.GetValues(typeof(Status)).Cast<Status>().ToDictionary(p => p.ToString(), p => (int)p);
            var priorities = Enum.GetValues(typeof(Priority)).Cast<Priority>().ToDictionary(p => p.ToString(), p => (int)p);
            var users = await _context.Users.Include(u=>u.Role).Where(u => u.Role.Type == RoleType.Dev || u.Role.Type == RoleType.Manager).ToListAsync();

            return Ok(new { ProjectList = projects, StatusList = statuses, PriorityList = priorities,Users = users });
        }

    }

    
    
}
