using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using PBL3.Server.Interface;

namespace PBL3.Server.Repositories
{
    public class EmployeeRepo : IEmployee
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public EmployeeRepo(MyDbContext context, IMapper mapper, IAccount accountRepository)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<EmployeeModel> AddEmployeeAsync(EmployeeModel employeeModel)
        {
            var employee = _mapper.Map<Employee>(employeeModel);
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employeeModel;
        }

        public async Task<EmployeeModel> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return null;
            }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return _mapper.Map<EmployeeModel>(employee);
        }

        public async Task<object> GetAllEmployeesAsync()
        {
            var employees = await (

                from e in _context.Employees
                join a in _context.Duties on e.DutyId equals a.Id
                select new
                {
                    e.Id,
                    e.FullName,
                    e.Email,
                    e.PhoneNumber,
                    e.TypeOfEmployee,
                    e.CoefficientsSalary,
                    a.DutyName,
                    e.Status
                }
            ).ToListAsync();
            return employees;
        }

        public async Task<object> GetAllEmployeesByStatusAsync(bool status)
        {
            var employees = await (
                from e in _context.Employees
                join a in _context.Duties on e.DutyId equals a.Id
                where e.Status == status
                select new
                {
                    e.Id,
                    e.FullName,
                    e.Email,
                    e.PhoneNumber,
                    e.TypeOfEmployee,
                    e.CoefficientsSalary,
                    a.DutyName,
                    e.Status
                }).ToListAsync();
            return employees;
        }

        public async Task<object> GetEmployeeByIdAsync(int id)
        {
            var employee = await (
                from e in _context.Employees
                join a in _context.Duties
                on e.DutyId equals a.Id
                where e.Id == id
                select new
                {
                    e.Id,
                    e.DutyId,
                    e.FullName,
                    e.Email,
                    e.PhoneNumber,
                    e.TypeOfEmployee,
                    e.CoefficientsSalary,
                    a.DutyName,
                    e.Status
                }).FirstOrDefaultAsync();
            return employee;
        }

        public async Task<EmployeeModel> UpdateEmployeeAsync(EmployeeModel employeeModel)
        {
            var employee = await _context.Employees.FindAsync(employeeModel.Id);
            if (employee == null)
            {
                return null;
            }
            _mapper.Map(employeeModel, employee);
            await _context.SaveChangesAsync();
            return employeeModel;
        }

        public async Task<object> SearchEmployeeByStringAsync(string searchString)
        {
            var employees = await (
                from e in _context.Employees
                join a in _context.Duties on e.DutyId equals a.Id
                where e.FullName.Contains(searchString)
                select new
                {
                    e.Id,
                    e.FullName,
                    e.Email,
                    e.PhoneNumber,
                    e.TypeOfEmployee,
                    e.CoefficientsSalary,
                    a.DutyName,
                    e.Status
                }).ToListAsync();
            return employees;
        }
    }
}