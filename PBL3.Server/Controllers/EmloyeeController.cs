using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Interface;
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
        private readonly IAccount _accountRepo;

        public EmployeeController(IEmployee employeeRepo, IAccount accountRepo)
        {
            _employeeRepo = employeeRepo;
            _accountRepo = accountRepo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllEmployeesAsync()
        {
            try
            {
                return await _employeeRepo.GetAllEmployeesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployeeByIdAsync(int id)
        {
            try
            {
                var employee = await _employeeRepo.GetEmployeeByIdAsync(id);
                if (employee == null)
                {
                    return NotFound();
                }

                return employee;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }

        [HttpGet("GetAllEmployeesByStatusAsync")]
        public async Task<ActionResult> GetAllEmployeesByStatusAsync(bool status)
        {
            try
            {
                return await _employeeRepo.GetAllEmployeesByStatusAsync(status);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> AddEmployeeAsync(EmployeeModel employeeModel)
        {
            try
            {
                var addedEmployee = await _employeeRepo.AddEmployeeAsync(employeeModel);
                if (addedEmployee != null)
                {
                    await _accountRepo.AddAccountAsync(employeeModel.Email, addedEmployee.Id);
                    return Ok(employeeModel);
                }
                else
                {
                    return BadRequest("Failed to add Employee!");
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEmployeeAsync(EmployeeModel employee)
        {
            try
            {
                return await _employeeRepo.UpdateEmployeeAsync(employee);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployeeAsync(int id)
        {
            try
            {
                return await _employeeRepo.DeleteEmployeeAsync(id);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpGet("SearchEmployeeByStringAsync")]
        public async Task<ActionResult> SearchEmployeeByStringAsync(string searchString)
        {
            try
            {
                return await _employeeRepo.SearchEmployeeByStringAsync(searchString);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }
    }
}