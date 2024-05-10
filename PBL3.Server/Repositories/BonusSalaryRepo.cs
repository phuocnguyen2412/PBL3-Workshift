using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public class BonusSalaryRepo : IBonusSalary
    {
        private readonly MyDbContext _context;

        public BonusSalaryRepo(MyDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddBonusSalaryForEmployeesAsync(BonusSalaryModel request)
        {
            if (request.EmployeeIds.Contains(0))
            {
                var allEmployeeIds = await _context.Employees.Select(e => e.Id).ToListAsync();
                foreach (var employeeId in allEmployeeIds)
                {
                    var newBonusSalary = new BonusSalaryHistory
                    {
                        EmployeeId = employeeId,
                        TotalBonus = request.TotalBonus,
                        DateTime = DateTime.Now,
                        Reason = request.Reason
                    };
                    _context.BonusSalaryHistories.Add(newBonusSalary);
                }
            }
            else
            {
                foreach (var employeeId in request.EmployeeIds)
                {
                    var newBonusSalary = new BonusSalaryHistory
                    {
                        EmployeeId = employeeId,
                        TotalBonus = request.TotalBonus,
                        DateTime = DateTime.Now,
                        Reason = request.Reason
                    };
                    _context.BonusSalaryHistories.Add(newBonusSalary);
                }
            }

            await _context.SaveChangesAsync();

            return _context.BonusSalaryHistories.FirstOrDefault()?.Id ?? 0;
        }
        public async Task<object> GetAllBonusSalaryAsync()
        {
            var bonusSalaries = await _context.BonusSalaryHistories
                .Join(_context.Employees, 
                      bonus => bonus.EmployeeId, 
                      emp => emp.Id,
                      (bonus, emp) => new  
                      {
                          Id = bonus.Id,
                          EmployeeId = bonus.EmployeeId,
                          FullName= emp.FullName,
                          DateTime = bonus.DateTime,
                          TotalBonus = bonus.TotalBonus,
                          Reason = bonus.Reason
                      })
                .ToListAsync();

            return bonusSalaries;
        }
        public async Task<bool> DeleteBonusSalaryAsync(int id)
        {
            var bonusSalary = await _context.BonusSalaryHistories.FindAsync(id);
            if (bonusSalary == null)
                return false;

            _context.BonusSalaryHistories.Remove(bonusSalary);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
