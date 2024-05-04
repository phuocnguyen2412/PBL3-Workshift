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
            var employees = await _employeeRepo.GetAllEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _employeeRepo.GetEmployeeByIdAsync(id);
            return Ok(employee);
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetAllEmployeesByStatus(bool status)
        {
            var employees = await _employeeRepo.GetAllEmployeesByStatusAsync(status);
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeModel employee)
        {
<<<<<<< HEAD
            var id = await _employeeRepo.AddEmployeeAsync(employee);
            return Ok(id);
=======
            try
            {

                var newEmployeeId = await _employeeRepo.AddEmployeeAsync(employee);
                var Employee = await _employeeRepo.GetEmployeeByIdAsync(newEmployeeId);
                return Employee == null ? NotFound() : Ok(Employee);

            }
            catch (Exception e)
            {
                return BadRequest("Add Employee fail!");
            }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(EmployeeModel employee)
        {
            var updatedEmployee = await _employeeRepo.UpdateEmployeeAsync(employee);
            return Ok(updatedEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
<<<<<<< HEAD
            var result = await _employeeRepo.DeleteEmployeeAsync(id);
            return Ok(result);
=======
            try
            {
                var success = await _employeeRepo.DeleteEmployeeAsync(id);
                return Ok(success);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        }
    }
}