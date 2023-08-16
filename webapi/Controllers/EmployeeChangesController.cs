using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks; // Vergessen Sie nicht, die entsprechende Namespace zu importieren
using webapi.models;
using webapi.Data;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeChangesController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeChangesController(DataContext context)
        {
            _context = context;
        }

        // POST: api/EmployeeChanges
        [HttpPost]
        public async Task<ActionResult<List<EmployeeChange>>> PostEmployeeChanges(List<EmployeeChange> employeeChanges)
        {
            if (employeeChanges == null || employeeChanges.Count == 0)
            {
                return BadRequest("No employee changes provided.");
            }

            try
            {
                var existingChanges = await _context.EmployeeChanges.ToListAsync();
                _context.EmployeeChanges.RemoveRange(existingChanges);

                _context.EmployeeChanges.AddRange(employeeChanges);
                await _context.SaveChangesAsync();

                var response = new { Message = "Employee change data has been successfully added." };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
    }
}
