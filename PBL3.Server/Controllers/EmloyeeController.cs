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
        private readonly IEmployee _employeeRepo;
        public EmployeeController(IEmployee employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployee()
        {
            try
            {
                return Ok(await _employeeRepo.GetAllEmployeesAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            try
            {
                return Ok(await _employeeRepo.GetEmployeeByIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetAllEmployeeByStatus(bool status)
        {
            try
            {
                return Ok(await _employeeRepo.GetAllEmployeesByStatusAsync(status));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmloyeeModel employee)
        {
            try
            {
                var newEmployeeId = await _employeeRepo.AddEmployeeAsync(employee);
                return CreatedAtAction(nameof(GetEmployeeById), new { id = newEmployeeId }, employee);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(EmloyeeModel employee)
        {
            try
            {
                return Ok(await _employeeRepo.UpdateEmployeeAsync(employee));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                return Ok(await _employeeRepo.DeleteEmployeeAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }

}