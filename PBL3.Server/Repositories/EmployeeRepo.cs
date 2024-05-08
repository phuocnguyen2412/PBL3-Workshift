using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using Microsoft.AspNetCore.Mvc;
using System;

namespace PBL3.Server.Repositories
{
    public class EmployeeRepo : IEmployee
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAccount _accountRepository;

        public EmployeeRepo(MyDbContext context, IMapper mapper, IAccount accountRepository)
        {
            _context = context;
            _mapper = mapper;
            _accountRepository = accountRepository;
        }

        public async Task<ActionResult> AddEmployeeAsync(EmployeeModel employeeModel)
        {
            if (employeeModel == null)
            {
                return new BadRequestObjectResult("Employee data cannot be empty.");
            }

            var employee = _mapper.Map<Employee>(employeeModel);

            _context.Employees!.Add(employee);
            await _context.SaveChangesAsync();

            var username = employeeModel.Email ?? throw new ArgumentNullException(nameof(employeeModel.Email), "Email cannot be null.");
            var hashedPassword = _accountRepository.HashPassword(employeeModel.Email);

            var account = new Account
            {
                UserName = username,
                Password = hashedPassword,
                EmployeeId = employee.Id
            };
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return new OkObjectResult(employee);
        }

        public async Task<ActionResult> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return new NotFoundObjectResult("Employee not found!");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return new OkObjectResult(employee);
        }

        public async Task<ActionResult> GetAllEmployeesAsync()
        {
            var result = await _context.Employees
                .Join(_context.Duties, employee => employee.DutyId, duty => duty.Id, (employee, duty) => new
                {
                    Id = employee.Id,
                    FullName = employee.FullName,
                    Email = employee.Email,
                    PhoneNumber = employee.PhoneNumber,
                    TypeOfEmployee = employee.TypeOfEmployee,
                    CoefficientsSalary = employee.CoefficientsSalary,
                    Status = employee.Status,
                    DutyName = duty.DutyName
                }).ToListAsync();

            return new OkObjectResult(result);
        }

        public async Task<ActionResult> GetAllEmployeesByStatusAsync(bool status)
        {
            var result = await _context.Employees
                .Where(employee => employee.Status == status)
                .Join(_context.Duties, employee => employee.DutyId, duty => duty.Id, (employee, duty) => new
                {
                    Id = employee.Id,
                    FullName = employee.FullName,
                    Email = employee.Email,
                    PhoneNumber = employee.PhoneNumber,
                    TypeOfEmployee = employee.TypeOfEmployee,
                    CoefficientsSalary = employee.CoefficientsSalary,
                    Status = employee.Status,
                    DutyName = duty.DutyName
                }).ToListAsync();

            return new OkObjectResult(result);
        }

        public async Task<ActionResult> GetEmployeeByIdAsync(int id)
        {
            var result = await _context.Employees
                .Where(employee => employee.Id == id)
                .Join(_context.Duties, employee => employee.DutyId, duty => duty.Id, (employee, duty) => new
                {
                    Id = employee.Id,
                    FullName = employee.FullName,
                    Email = employee.Email,
                    PhoneNumber = employee.PhoneNumber,
                    TypeOfEmployee = employee.TypeOfEmployee,
                    CoefficientsSalary = employee.CoefficientsSalary,
                    Status = employee.Status,
                    DutyName = duty.DutyName
                }).FirstOrDefaultAsync();

            if (result == null)
            {
                return new NotFoundObjectResult("Employee not found!");
            }

            return new OkObjectResult(result);
        }

        public async Task<ActionResult> UpdateEmployeeAsync(EmployeeModel employeeModel)
        {
            if (employeeModel == null)
            {
                return new BadRequestObjectResult("Employee data cannot be empty.");
            }

            var existingEmployee = await _context.Employees.FindAsync(employeeModel.Id);
            if (existingEmployee == null)
            {
                return new NotFoundObjectResult("Employee not found!");
            }

            _mapper.Map(employeeModel, existingEmployee);

            _context.Employees.Attach(existingEmployee);

            _context.Entry(existingEmployee).Property(x => x.Id).IsModified = false;

            bool anyFieldModified = false;

            
            foreach (var property in _context.Entry(existingEmployee).Properties)
            {
                var originalValue = property.OriginalValue;
                var currentValue = property.CurrentValue;
                if (property.Metadata.Name != "Id" && !Equals(originalValue, currentValue))
                {
                    property.IsModified = true;
                    anyFieldModified = true;
                }
            }

            
            if (!anyFieldModified)
            {
                return new BadRequestObjectResult("At least one field other than 'Id' must be updated.");
            }

            try
            {
                await _context.SaveChangesAsync();
                return new OkObjectResult("Update employee successfully!");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return new BadRequestObjectResult($"An error occurred while updating the employee: {ex.Message}");
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"An unexpected error occurred: {ex.Message}");
            }
        }

        public async Task<ActionResult> SearchEmployeeByStringAsync(string searchString)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                throw new ArgumentNullException(nameof(searchString), "Search string cannot be null or empty.");
            }

            var employees = await _context.Employees
                .Where(employee => EF.Functions.Like(employee.FullName, $"%{searchString}%"))
                .Join(_context.Duties, employee => employee.DutyId, duty => duty.Id, (employee, duty) => new
                {
                    Id = employee.Id,
                    FullName = employee.FullName,
                    Email = employee.Email,
                    PhoneNumber = employee.PhoneNumber,
                    TypeOfEmployee = employee.TypeOfEmployee,
                    CoefficientsSalary = employee.CoefficientsSalary,
                    Status = employee.Status,
                    DutyName = duty.DutyName
                }).ToListAsync();

            if (employees.Count == 0)
            {
                return new NotFoundObjectResult("No employees found matching the search criteria.");
            }

            return new OkObjectResult(employees);
        }
    }
}