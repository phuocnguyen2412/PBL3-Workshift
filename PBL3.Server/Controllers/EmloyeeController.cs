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
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var employees = await _employeeRepo.GetAllEmployeesAsync();
                return Ok(employees);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            try
            {
                var employee = await _employeeRepo.GetEmployeeByIdAsync(id);
                return Ok(employee);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetAllEmployeesByStatus(bool status)
        {
            try
            {
                var employees = await _employeeRepo.GetAllEmployeesByStatusAsync(status);
                return Ok(employees);
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeModel employee)
        {
            try
            {
                var result = await _employeeRepo.AddEmployeeAsync(employee);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(EmployeeModel employee)
        {
            try
            {
                var updatedEmployee = await _employeeRepo.UpdateEmployeeAsync(employee);
                return Ok(updatedEmployee);
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var success = await _employeeRepo.DeleteEmployeeAsync(id);
                return Ok(success);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchEmployees(string searchString)
        {
            if (string.IsNullOrWhiteSpace(searchString))
            {
                return BadRequest("Search string cannot be empty.");
            }

            try
            {
                var employees = await _employeeRepo.SearchEmployeeByStringAsync(searchString);
                return Ok(employees);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}