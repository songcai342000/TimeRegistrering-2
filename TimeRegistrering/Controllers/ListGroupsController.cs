using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeRegistrering.Data;
using TimeRegistrering.Models;

namespace TimeRegistrering.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ListGroupsController : ControllerBase
    {
        private readonly TimeRegistrationContext _context;

        public ListGroupsController(TimeRegistrationContext context)
        {
            _context = context;
        }

        
    }
}
