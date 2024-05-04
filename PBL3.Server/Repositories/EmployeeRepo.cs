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

        public async Task<string> DeleteEmployeeAsync(int id)
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

        public async Task<object> GetAllEmployeesAsync()
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
                             //DutyId = employee.DutyId,
                             Status = employee.Status,
                             DutyName = duty.DutyName
                         };

            return await result.ToListAsync();
        }

        public async Task<object> GetAllEmployeesByStatusAsync(bool status)
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

        public async Task<object> GetEmployeeByIdAsync(int id)
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

        public async Task<object> UpdateEmployeeAsync(EmployeeModel employeeModel)
        {
            var employee = _mapper.Map<Employee>(employeeModel);

            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return employeeModel;
        }
    }
}
