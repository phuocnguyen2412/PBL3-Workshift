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
        private readonly IAccount _accountRepo;

        public EmployeeRepo(MyDbContext context, IMapper mapper, IAccount accountRepo)
        {
            _context = context;
            _mapper = mapper;
            _accountRepo = accountRepo;
        }

        public async Task<string> AddEmployeeAsync(EmployeeModel employeeModel)
        {
            try
            {
                var employee = _mapper.Map<Employee>(employeeModel);

                _context.Employees!.Add(employee);
                await _context.SaveChangesAsync();

                var username = employeeModel.Email;
                var hashedPassword = _accountRepo.HashPassword(employeeModel.Email!);

                var account = new Account
                {
                    UserName = username,
                    Password = hashedPassword,
                    EmployeeId = employee.Id
                };
                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();

                return "Add employee successfully!";
            }
            catch (Exception ex)
            {
                return $"Failed to add employee: {ex.Message}";
            }
        }


        public async Task<string> DeleteEmployeeAsync(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee == null)
                {
                    return "Employee not found!";
                }

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                return "Delete employee successfully!";
            }
            catch (Exception ex)
            {
                return $"Failed to delete employee: {ex.Message}";
            }
        }


        public async Task<object> GetAllEmployeesAsync()
        {
            try
            {
                var result = from employee in _context.Employees
                             join duty in _context.Duties on employee.DutyId equals duty.Id
                             select new
                             {
                                 Id = employee.Id,
                                 FullName = employee.FullName,
                                 Email = employee.Email,
                                 PhoneNumber = employee.PhoneNumber,
                                 TypeOfEmployee = employee.TypeOfEmployee,
                                 CoefficientsSalary = employee.CoefficientsSalary,
                                 Status = employee.Status,
                                 DutyName = duty.DutyName
                             };

                return await result.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to retrieve all employees: {ex.Message}", ex);
            }
        }


        public async Task<object> GetAllEmployeesByStatusAsync(bool status)
        {
            try
            {
                var result = from employee in _context.Employees
                             join duty in _context.Duties on employee.DutyId equals duty.Id
                             where employee.Status == status
                             select new
                             {
                                 Id = employee.Id,
                                 FullName = employee.FullName,
                                 Email = employee.Email,
                                 PhoneNumber = employee.PhoneNumber,
                                 TypeOfEmployee = employee.TypeOfEmployee,
                                 CoefficientsSalary = employee.CoefficientsSalary,
                                 //DutyId = employee.DutyId,
                                 Status = employee.Status,
                                 DutyName = duty.DutyName
                             };

                return await result.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to retrieve all employees by status: {ex.Message}", ex);
            }
        }

        public async Task<object> GetEmployeeByIdAsync(int id)
        {
            try
            {
                var result = from employee in _context.Employees
                             join duty in _context.Duties on employee.DutyId equals duty.Id
                             where employee.Id == id
                             select new
                             {
                                 Id = employee.Id,
                                 FullName = employee.FullName,
                                 Email = employee.Email,
                                 PhoneNumber = employee.PhoneNumber,
                                 TypeOfEmployee = employee.TypeOfEmployee,
                                 CoefficientsSalary = employee.CoefficientsSalary,
                                 //DutyId = employee.DutyId,
                                 Status = employee.Status,
                                 DutyName = duty.DutyName
                             };

                return await result.FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to retrieve all employees by status: {ex.Message}", ex);
            }
        }

        public async Task<object> UpdateEmployeeAsync(EmployeeModel employeeModel)
        {
            try
            {
                var employee = _mapper.Map<Employee>(employeeModel);

                _context.Entry(employee).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return employeeModel;
            }
            catch (DbUpdateException ex)
            {
                throw new Exception($"Failed to update employee due to database constraints: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to update employee: {ex.Message}", ex);
            }
        }

        public async Task<object> SearchEmployeeByStringAsync(string searchString)
        {
            try
            {
                var employees = from employee in _context.Employees
                                join duty in _context.Duties on employee.DutyId equals duty.Id
                                where EF.Functions.Like(employee.FullName, $"%{searchString}%")
                                select new
                                {
                                    Id = employee.Id,
                                    FullName = employee.FullName,
                                    Email = employee.Email,
                                    PhoneNumber = employee.PhoneNumber,
                                    TypeOfEmployee = employee.TypeOfEmployee,
                                    CoefficientsSalary = employee.CoefficientsSalary,
                                    Status = employee.Status,
                                    DutyName = duty.DutyName
                                };
                return await employees.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to search employees by string: {ex.Message}", ex);
            }
        }
    }
}
