using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;
using PBL3.Server.Repositories;
using System.Threading.Tasks;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployee _employeeService;
        public EmployeeController(IEmployee employeeService)
        {
            _employeeService = employeeService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployee()
        {
            return Ok(await _employeeService.GetEmployee());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmloyee(int id)
        {
            var Employee = await _employeeService.GetEmployeeById(id);
            return Employee == null? NotFound() : Ok(Employee);
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmloyeeModel employee)
        {
            try
            {
                var newEmployeeId = await _employeeService.AddEmployee(employee);
                return CreatedAtAction(nameof(GetEmloyee), new { id = newEmployeeId }, employee);
            }

            catch 

            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmloyee(EmloyeeModel employee)
        {
            return Ok(await _employeeService.UpdateEmployee(employee));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            return Ok(await _employeeService.DeleteEmployee(id));
        }
    }
}