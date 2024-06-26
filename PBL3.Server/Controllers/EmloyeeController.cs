﻿using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Helpers;
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
        private readonly IAccount _accountRepository;

        public EmployeeController(IEmployee employeeRepository, IAccount accountRepository)
        {

            _employeeRepository = employeeRepository;
            _accountRepository = accountRepository;
        }

        [HttpGet]
        [RolesAuthorize("Admin")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var employees = await _employeeRepository.GetAllEmployeesAsync();
                if (employees == null)
                {
                    return NotFound(new { Message = "No employees found." });
                }
                return Ok(employees);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { Message = e.Message });
            }
        }

        [HttpGet("{id}")]
        [RolesAuthorize("Admin", "Employee", "Manager")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
                if (employee == null)
                {
                    return NotFound(new { Message = "No employees found." });
                }
                return Ok(employee);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { Message = e.Message });
            }
        }

        [HttpGet("status/{status}")]
        [RolesAuthorize("Admin", "Manager")]
        public async Task<ActionResult> GetByStatus(bool status)
        {
            try
            {
                var employees = await _employeeRepository.GetAllEmployeesByStatusAsync(status);
                if (employees == null)
                {
                    return NotFound(new { Message = "No employees found with the specified status." });
                }
                return Ok(employees);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { Message = e.Message });
            }
        }

        [HttpPost]
        [RolesAuthorize("Admin")]
        public async Task<ActionResult<EmployeeModel>> Add(EmployeeModel employee)
        {
            if (employee == null)
            {
                return BadRequest(new { Message = "Employee data is null." });
            }

            try
            {
                var createdEmployee = await _employeeRepository.AddEmployeeAsync(employee);
                if (createdEmployee != null)
                {
                    await _accountRepository.AddAccountAsync(employee.Email, createdEmployee.Id);
                    return Ok(createdEmployee);
                }
                else
                {
                    return BadRequest(new { Message = "Failed to add Employee!" });
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, new { Message = e.Message });
            }
        }

        [HttpPut]
        [RolesAuthorize("Admin")]
        public async Task<ActionResult<EmployeeModel>> Update(EmployeeModel employee)
        {
            if (employee == null)
            {
                return BadRequest(new { Message = "Employee data is null." });
            }

            try
            {
                var updatedEmployee = await _employeeRepository.UpdateEmployeeAsync(employee);
                if (updatedEmployee == null)
                {
                    return NotFound(new { Message = "No employees found." });
                }
                return Ok(updatedEmployee);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { Message = e.Message });
            }
        }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult<EmployeeModel>> Delete(int id)
        // {
        //     try
        //     {
        //         var employee = await _employeeRepository.DeleteEmployeeAsync(id);
        //         if (employee == null)
        //         {
        //             return NotFound($"Employee with ID {id} not found.");
        //         }
        //         return Ok(employee);
        //     }
        //     catch (Exception e)
        //     {
        //         return StatusCode(500, new { Message = e.Message });
        //     }
        // }

        [HttpGet("search/{searchString}")]
        [RolesAuthorize("Admin")]
        public async Task<ActionResult<object>> SearchByString(string searchString)
        {
            try
            {
                var employees = await _employeeRepository.SearchEmployeeByStringAsync(searchString);
                if (employees == null)
                {
                    return NotFound(new { Message = $"No employees found matching '{searchString}'." });
                }
                return Ok(employees);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { Message = e.Message });
            }
        }
    }
}
