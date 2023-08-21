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
                    employeeId = e.employeenumber,
                    guid = e.GUID,
                    firstName = e.firstname,
                    lastName = e.lastname
                })
                .ToArrayAsync();

            return employees;
        }
    }

    public class EmployeeInfo
    {
        public int employeeId { get; set; }
        public Guid guid { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
    }
}
