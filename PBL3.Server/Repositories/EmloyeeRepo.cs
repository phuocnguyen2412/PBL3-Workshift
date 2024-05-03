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

        public async Task<List<EmloyeeModel>> GetAllEmployeesAsync()
        {
            var employees = await _context.Employees.ToListAsync();
            return _mapper.Map<List<EmloyeeModel>>(employees);
        }

        public async Task<EmloyeeModel> GetEmployeeByIdAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            return _mapper.Map<EmloyeeModel>(employee);
        }

        public async Task<List<EmployeeSummaryModel>> GetAllEmployeesByStatusAsync(bool status)
        {
            var employees = await _context.Employees
                .Include(e => e.Duty)
                .Where(e => e.Status == status)
                .Select(e => new EmployeeSummaryModel
                {
                    Id = e.Id,
                    FullName = e.FullName,
                    TypeOfEmployee = e.TypeOfEmployee,
                    Status = e.Status,
                    DutyName = e.Duty != null ? e.Duty.DutyName : "N/A"
                })
                .ToListAsync();

            return employees;
        }

        public async Task<int> AddEmployeeAsync(EmloyeeModel employeeModel)
        {
            var employee = _mapper.Map<Employee>(employeeModel);

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            var username = employeeModel.Email;
            var hashedPassword = _accountRepo.HashPassword(employeeModel.Email);

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


        public async Task<EmloyeeModel> UpdateEmployeeAsync(EmloyeeModel employeeModel)
        {
            var employee = _mapper.Map<Employee>(employeeModel);
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return _mapper.Map<EmloyeeModel>(employee);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                throw new InvalidOperationException("Không tồn tại bản ghi");

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
