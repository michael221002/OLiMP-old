using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using webapi.Data;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SelectEmployeeController : ControllerBase
    {
        private readonly DataContext _context;

        public SelectEmployeeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<EmployeeInfo[]>> GetAllEmployees()
        {
            var employees = await _context.CurrentState
                .Select(e => new EmployeeInfo
                {
                    EmployeeId = e.employeenumber,
                    Guid = e.GUID,
                    FirstName = e.firstname,
                    LastName = e.lastname
                })
                .ToArrayAsync();

            return employees;
        }
    }

    public class EmployeeInfo
    {
        public int EmployeeId { get; set; }
        public Guid Guid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
