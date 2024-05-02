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
<<<<<<< HEAD
        private readonly IEmployee _employeeService;

        public EmployeeController(IEmployee employeeService)
=======
        private readonly IEmployee _employeeRepo;
        public EmployeeController(IEmployee employeeRepo)
>>>>>>> 909ddd8535f3d5d43a8d705c68909f8a2724094e
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

<<<<<<< HEAD
=======
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


>>>>>>> 909ddd8535f3d5d43a8d705c68909f8a2724094e
        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmloyeeModel employee)
        {
            try
            {
<<<<<<< HEAD
                var newEmployeeId = await _employeeService.AddEmployee(employee);
                var Employee = await _employeeService.GetEmployeeById(newEmployeeId);
                return Employee == null ? NotFound() : Ok(Employee);
=======
                var newEmployeeId = await _employeeRepo.AddEmployeeAsync(employee);
                return CreatedAtAction(nameof(GetEmployeeById), new { id = newEmployeeId }, employee);
>>>>>>> 909ddd8535f3d5d43a8d705c68909f8a2724094e
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
<<<<<<< HEAD
        public async Task<IActionResult> UpdateEmloyee(int id,EmloyeeModel employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            var existingEmployee = await _employeeService.GetEmployeeById(id);
            if (existingEmployee == null)
            {
                return NotFound();
            }

            var updatedEmployee = await _employeeService.UpdateEmployee(employee);
            return Ok(updatedEmployee);
=======
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
>>>>>>> 909ddd8535f3d5d43a8d705c68909f8a2724094e
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
<<<<<<< HEAD
            var success = await _employeeService.DeleteEmployee(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
=======
            try
            {
                
                return Ok(await _employeeRepo.DeleteEmployeeAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
>>>>>>> 909ddd8535f3d5d43a8d705c68909f8a2724094e
        }
    }

}