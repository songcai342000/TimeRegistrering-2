using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TimeRegistrering.Data;
using TimeRegistrering.Controllers;
using TimeRegistrering.Models;

namespace TimeRegistrering.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TimeRegistrationsController : ControllerBase
    {
        private readonly TimeRegistrationContext _context;
        public static TimeRegistration[] registrations = new TimeRegistration[]
        {
            new TimeRegistration { RegistrationId=1, UserId=2, ProjectName="ABC Kidgarden Construction", Comment = "123456sC!", Hours=1, RegistrationTime=new DateTime(2019, 11, 02, 13, 50, 34)},
            new TimeRegistration { RegistrationId=2, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "123456sC!", Hours=1, RegistrationTime=new DateTime(2019, 11, 03, 13, 50, 34)},
            new TimeRegistration { RegistrationId=3, UserId=2, ProjectName="Bluegarden Construction", Comment = "123456sC!", Hours=1, RegistrationTime=new DateTime(2019, 11, 04, 13, 50, 34)},
            new TimeRegistration { RegistrationId=4, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "123456sC!", Hours=2, RegistrationTime=new DateTime(2020, 10, 03, 13, 50, 34)},
            new TimeRegistration { RegistrationId=5, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "123456sC!", Hours=2, RegistrationTime=new DateTime(2020, 10, 04, 13, 50, 34)},
            new TimeRegistration { RegistrationId=6, UserId=2, ProjectName="Sunshine Primary School Construction", Comment = "123456sC!", Hours=2, RegistrationTime=new DateTime(2020, 10, 05, 13, 50, 34)},
            new TimeRegistration { RegistrationId=7, UserId=2, ProjectName="Bluegarden Construction", Comment = "123456sC!", Hours=8, RegistrationTime=new DateTime(2021, 01, 03, 16, 50, 34)},
            new TimeRegistration { RegistrationId=8, UserId=2, ProjectName="Bluegarden Construction", Comment = "123456sC!", Hours=8, RegistrationTime=new DateTime(2021, 01, 04, 16, 50, 34)},
            new TimeRegistration { RegistrationId=9, UserId=2, ProjectName="Bluegarden Construction", Comment = "123456sC!", Hours=8, RegistrationTime=new DateTime(2021, 01, 05, 16, 50, 34)},
            new TimeRegistration { RegistrationId=10, UserId=2, ProjectName="Bluegarden Construction", Comment = "123456sC!", Hours=8, RegistrationTime=new DateTime(2021, 01, 06, 16, 50, 34)},
            new TimeRegistration { RegistrationId=11, UserId=1, ProjectName="Bluegarden Construction", Comment = "123456sC!", Hours=1, RegistrationTime=new DateTime(2021, 02, 01, 13, 50, 34)},
            new TimeRegistration { RegistrationId=12, UserId=1, ProjectName="General Administration", Comment = "123456sC!", Hours=7, RegistrationTime=new DateTime(2021, 02, 01, 16, 50, 34)},
        };

        public List<TimeRegistration> sessionRegistrations = new List<TimeRegistration>();
        public TimeRegistrationsController(TimeRegistrationContext context)
        {
            _context = context;
            foreach (TimeRegistration r in registrations)
            {
                sessionRegistrations.Add(r);
            }
            sessionRegistrations.ToArray();
        }

        [HttpGet("GetTimeRegistrations/{UserName}")]
        public IEnumerable<ListGroup> GetTimeRegistrations(string userName)
        {
            List<ListGroup> listGroups = new List<ListGroup>();
            try
            {
                var query = (from t in sessionRegistrations join u in UserController.users on t.UserId equals u.UserId where u.UserName == userName select t).AsEnumerable().OrderByDescending(t => t.RegistrationTime).GroupBy(g => g.RegistrationTime.Year, groupKey => new { Key = groupKey });
                foreach (var q in query)
                {
                    var list = sessionRegistrations.Where(g => g.RegistrationTime.Year == q.Key).ToArray();

                    listGroups.Add(new ListGroup(q.Key, list));

                }
            }
            catch (Exception ex)
            {

            }
            return listGroups;
        }

        [HttpGet("GetSearchRegistrations/{projectName}/{userName}/{date}")]
        //[HttpGet("GetSearchRegistrations")]
        public IEnumerable<ListGroup> GetSearchRistrations(string projectName, string userName, string date)
        //public IEnumerable<ListGroup> GetSearchRistrations()
        {
            /*var s = conditions.Split("/");
            string projectName = s[0];
            string userName = s[1];
            string date = s[2];*/
            
            List<ListGroup> listGroups = new List<ListGroup>();
            try {
                if (projectName == "undefined" && date == "undefined")
                {
                    var query = (from t in sessionRegistrations join u in UserController.users on t.UserId equals u.UserId where u.UserName == userName select t).AsEnumerable().OrderByDescending(t => t.RegistrationTime).GroupBy(g => g.RegistrationTime.Year, groupKey => new { Key = groupKey });
                    foreach (var q in query)
                    {
                        var list = sessionRegistrations.Where(g => g.RegistrationTime.Year == q.Key).ToArray();

                        listGroups.Add(new ListGroup(q.Key, list));

                    }
                }
                 else if (projectName == "undefined" && date != "undefined")
                 {
                     var query = (from t in sessionRegistrations join u in UserController.users on t.UserId equals u.UserId where u.UserName == userName && t.RegistrationTime.Date == DateTime.Parse(date) select t).AsEnumerable().OrderByDescending(t => t.RegistrationTime).GroupBy(g => g.RegistrationTime.Year, groupKey => new { Key = groupKey });
                     foreach (var q in query)
                     {
                         var list = sessionRegistrations.Where(g => g.RegistrationTime.Year == q.Key).ToArray();

                         listGroups.Add(new ListGroup(q.Key, list));
                     }
                 }
                 else if (date == "undefined" && projectName != "undefined")
                 {
                    var query = (from t in sessionRegistrations join u in UserController.users on t.UserId equals u.UserId where u.UserName == userName && t.ProjectName == projectName select t).AsEnumerable().OrderByDescending(t => t.RegistrationTime).GroupBy(g => g.RegistrationTime.Year, groupKey => new { Key = groupKey });
                    foreach (var q in query)
                     {
                         var list = sessionRegistrations.Where(g => g.RegistrationTime.Year == q.Key).ToArray();

                         listGroups.Add(new ListGroup(q.Key, list));

                     }
                 }
                 else
                 {
                    var query = (from t in sessionRegistrations join u in UserController.users on t.UserId equals u.UserId where u.UserName == userName && t.ProjectName == projectName && t.RegistrationTime.Date == DateTime.Parse(date)select t).AsEnumerable().OrderByDescending(t => t.RegistrationTime).GroupBy(g => g.RegistrationTime.Year, groupKey => new { Key = groupKey });
                    foreach (var q in query)
                     {
                         var list = sessionRegistrations.Where(g => g.RegistrationTime.Year == q.Key).ToArray();
                         listGroups.Add(new ListGroup(q.Key, list));
                     }
                 }
            }
            catch (Exception ex)
            {

            }

            return listGroups;

        }


        // GET: api/TimeRegistrations
        /* [HttpGet]
         public async Task<ActionResult<IEnumerable<Object>>> GetTimeRegistrations()
         {
            return await _context.TimeRegistrations.ToListAsync();
         }*/

        // GET: api/TimeRegistrations/5
        /*[HttpGet("{id}")]
        public async Task<ActionResult<TimeRegistration>> GetTimeRegistration(int id)
        {
            var timeRegistration = sessionRegistrations.FirstOrDefault(r=>r.RegistrationId == id);

            if (timeRegistration == null)
            {
                return NotFound();
            }

            return timeRegistration;
        }*/

        // PUT: api/TimeRegistrations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimeRegistration(int id, TimeRegistration timeRegistration)
        {
            if (id != timeRegistration.RegistrationId)
            {
                return BadRequest();
            }

            _context.Entry(timeRegistration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeRegistrationExists(id))
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

        // POST: api/TimeRegistrations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public void PostTimeRegistration(TimeRegistration timeRegistration)
        {
            sessionRegistrations.Append(timeRegistration);
        }

        // DELETE: api/TimeRegistrations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeRegistration(int id)
        {
            var timeRegistration = await _context.TimeRegistrations.FindAsync(id);
            if (timeRegistration == null)
            {
                return NotFound();
            }

            _context.TimeRegistrations.Remove(timeRegistration);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TimeRegistrationExists(int id)
        {
            return _context.TimeRegistrations.Any(e => e.RegistrationId == id);
        }
    }
}
