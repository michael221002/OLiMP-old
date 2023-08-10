using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrentStateController : ControllerBase
    {
        private readonly DataContext _context;

        public CurrentStateController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<tableShema>>> GetCurrentData()
        {
            return Ok(await _context.CurrentState.ToListAsync());
        }

        [HttpPost("singleEmployee")]
        public async Task<ActionResult<List<tableShema>>> AddEmployeeToCurrentState(tableShema employee)
        {
            _context.CurrentState.Add(employee);
            await _context.SaveChangesAsync();

            return Ok(await _context.CurrentState.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<tableShema>>> AddEmployeesToCurrentState(List<tableShema> employees)
        {
            // Alle vorhandenen Employees in der Datenbank löschen
            var existingEmployees = await _context.CurrentState.ToListAsync();
            _context.CurrentState.RemoveRange(existingEmployees);

            // Neue Employees zur Datenbank hinzufügen
            _context.CurrentState.AddRange(employees);
            await _context.SaveChangesAsync();

            // Geben Sie die aktualisierte Liste aller Employees im CurrentState zurück
            return Ok(await _context.CurrentState.ToListAsync());
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult<List<tableShema>>> DeleteEmployee(int id)
        {
            var dbEmployee = await _context.CurrentState.FindAsync(id);
            if (dbEmployee == null)
                return BadRequest("Employee not found");

            _context.CurrentState.Remove(dbEmployee);
            await _context.SaveChangesAsync();

            return Ok(await _context.CurrentState.ToListAsync());
        }
    }
}
