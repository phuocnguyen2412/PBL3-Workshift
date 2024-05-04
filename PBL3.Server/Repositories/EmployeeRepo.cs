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

        public async Task<int> AddEmployeeAsync(EmployeeModel employeeModel)
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

            return employee.Id;
        }

        public async Task<Employee> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees!.FindAsync(id);
            if (employee == null)
            {
                return null;
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        public async Task<List<EmployeeModel>> GetAllEmployeesAsync()
        {
            var employees = await _context.Employees!.ToListAsync();
            return _mapper.Map<List<EmployeeModel>>(employees);
        }

        public async Task<List<EmployeeModel>> GetAllEmployeesByStatusAsync(bool status)
        {
            var employees = await _context.Employees!.Where(e => e.Status == status).ToListAsync();
            return _mapper.Map<List<EmployeeModel>>(employees);
        }

        public async Task<List<EmployeeModel>> GetEmployeeByIdAsync(int id)
        {
            var employee = await _context.Employees!.FindAsync(id);
            if (employee == null)
            {
                return null;
            }

            return new List<EmployeeModel> { _mapper.Map<EmployeeModel>(employee) };
        }

        public async Task<EmployeeModel> UpdateEmployeeAsync(EmployeeModel employeeModel)
        {
            var employee = _mapper.Map<Employee>(employeeModel);

            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return employeeModel;
        }
    }
}
