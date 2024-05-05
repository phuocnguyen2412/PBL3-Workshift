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
                var Employee = await _employeeRepo.GetEmployeeByIdAsync(newEmployeeId);
                return Employee == null ? NotFound() : Ok(Employee);

            }

            catch 

            {
                return BadRequest("Add Employee fail!");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmloyee(int id, EmloyeeModel employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            var existingEmployee = await _employeeRepo.GetEmployeeByIdAsync(id);
            if (existingEmployee == null)
            {
                return NotFound();
            }

            var updatedEmployee = await _employeeRepo.UpdateEmployeeAsync(employee);
            return Ok(updatedEmployee);
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
    }
}