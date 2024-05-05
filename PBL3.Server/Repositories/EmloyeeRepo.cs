using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using Microsoft.AspNetCore.Mvc;

namespace PBL3.Server.Repositories
{
    public class EmployeeRepo : IEmployee
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public EmployeeRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<EmloyeeModel>> GetEmployee()
        {
            var employees = await _context.Employees!.ToListAsync();
            return _mapper.Map<List<EmloyeeModel>>(employees);
        }

        public async Task<EmloyeeModel> GetEmployeeById(int id)
        {
<<<<<<< Updated upstream
            var employee = await _context.Employees!.FindAsync(id);
            return _mapper.Map<EmloyeeModel>(employee);
=======
            var result = from employee in _context.Employees
                         join duty in _context.Duties on employee.DutyId equals duty.Id
                         select new 
                         {
                             Id = employee.Id,
                             FullName = employee.FullName,
                             Email = employee.Email,
                             PhoneNumber = employee.PhoneNumber,
                             TypeOfEmployee = employee.TypeOfEmployee,
                             Status = employee.Status,
                             CoefficientsSalary = employee.CoefficientsSalary,
                             DutyName = duty.DutyName,
                             BasicSalary = duty.BasicSalary,
                         };
                           
            return await result.FirstOrDefaultAsync();
>>>>>>> Stashed changes
        }

        public async Task<int> AddEmployee(EmloyeeModel employeeModel)
        {
            var employee = _mapper.Map<Employee>(employeeModel);
            _context.Employees!.Add(employee);
            await _context.SaveChangesAsync();
            return 0;


        }

        public async Task<EmloyeeModel> UpdateEmployee(EmloyeeModel employeeModel)
        {
            var employee = _mapper.Map<Employee>(employeeModel);
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return _mapper.Map<EmloyeeModel>(employee);
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var employee = await _context.Employees!.FindAsync(id);
            if (employee == null)
<<<<<<< Updated upstream
            {
                return false;
            }
=======
            throw new InvalidOperationException("Không tồn tại bản ghi");
>>>>>>> Stashed changes

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}