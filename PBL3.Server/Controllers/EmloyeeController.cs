using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using PBL3.Server.Repositories;
using System;
using System.Threading.Tasks;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployee _employeeRepository;

        public EmployeeController(IEmployee employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllEmployeesAsync()
        {
            try
            {
                var employees = await _employeeRepository.GetAllEmployeesAsync();
                if (employees == null)
                {
                    return NotFound("No employees found.");
                }
                return Ok(employees);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployeeByIdAsync(int id)
        {
            try
            {
                var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
                if (employee == null)
                {
                    return NotFound($"Employee with ID {id} not found.");
                }
                return Ok(employee);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult> GetAllEmployeesByStatusAsync(bool status)
        {
            try
            {
                var employees = await _employeeRepository.GetAllEmployeesByStatusAsync(status);
                if (employees == null)
                {
                    return NotFound("No employees found with the specified status.");
                }
                return Ok(employees);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> AddEmployeeAsync(EmployeeModel employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee data is null.");
            }

            try
            {
                var createdEmployee = await _employeeRepository.AddEmployeeAsync(employee);
                return CreatedAtAction(nameof(GetEmployeeByIdAsync), new { id = createdEmployee.Id }, createdEmployee);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpPut]
        public async Task<ActionResult<EmployeeModel>> UpdateEmployeeAsync(EmployeeModel employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee data is null.");
            }

            try
            {
                var updatedEmployee = await _employeeRepository.UpdateEmployeeAsync(employee);
                if (updatedEmployee == null)
                {
                    return NotFound($"Employee with ID {employee.Id} not found.");
                }
                return Ok(updatedEmployee);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<EmployeeModel>> DeleteEmployeeAsync(int id)
        {
            try
            {
                var employee = await _employeeRepository.DeleteEmployeeAsync(id);
                if (employee == null)
                {
                    return NotFound($"Employee with ID {id} not found.");
                }
                return Ok(employee);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpGet("search/{searchString}")]
        public async Task<ActionResult<object>> SearchEmployeeByStringAsync(string searchString)
        {
            try
            {
                var employees = await _employeeRepository.SearchEmployeeByStringAsync(searchString);
                if (employees == null)
                {
                    return NotFound($"No employees found matching '{searchString}'.");
                }
                return Ok(employees);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }
    }
}
