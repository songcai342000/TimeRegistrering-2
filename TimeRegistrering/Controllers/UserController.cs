using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeRegistrering.Data;
using TimeRegistrering.Models;
using Microsoft.Extensions.Configuration;


namespace TimeRegistrering.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IConfiguration _config;
        public static User[] users = new User[]
        {
            new User { UserId=1, UserName="admin@admin.com", Password = "123456aA!", UserType="Admin"},
            new User { UserId=2, UserName="ankit@ankit.com", Password = "123456aA!", UserType="User"}
        };

        public UserController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        [Route("GetUserData")]
        [Authorize(Policy = Policies.User)]
        public IActionResult GetUserData()
        {
            return Ok("This is an normal user");
        }

        [HttpGet]
        [Route("GetAdminData")]
        [Authorize(Policy = Policies.Admin)]
        public IActionResult GetAdminData()
        {
            return Ok("This is an Admin user");
        }

        [HttpGet]
        [Route("GetUserId/{userName}")]
        public int GetUserId(string userName)
        {
            return users.FirstOrDefault(u => u.UserName == userName).UserId;
        }
    }
}
