using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public class BonusSalaryRepo : IBonusSalary
    {
        private readonly MyDbContext _context;

        public BonusSalaryRepo(MyDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddBonusSalaryForEmployeesAsync(BonusSalaryModel model)
        {
            var bonusSalaryHistories = new List<BonusSalaryHistory>();

            var employeeIdsToProcess = model.EmployeeIds.Contains(0)
                ? await _context.Employees.Select(e => e.Id).ToListAsync()
                : model.EmployeeIds;

            foreach (var employeeId in employeeIdsToProcess)
            {
                var newBonusSalary = new BonusSalaryHistory
                {
                    EmployeeId = employeeId,
                    Bonus = model.Bonus,
                    Date = DateTime.Now,
                    Reason = model.Reason
                };
                bonusSalaryHistories.Add(newBonusSalary);
                _context.BonusSalaryHistories.Add(newBonusSalary);
            }

            await _context.SaveChangesAsync();

            return bonusSalaryHistories.FirstOrDefault()?.Id ?? 0;
        }

        public async Task<object> GetAllBonusSalaryAsync()
        {
            var bonusSalary = await (
                from b in _context.BonusSalaryHistories
                join e in _context.Employees on b.EmployeeId equals e.Id
                select new
                {
                    b.Id,
                    EmployeeId = b.EmployeeId,
                    FullName = e.FullName,
                    DateTime = b.Date,
                    TotalBonus = b.Bonus,
                    Reason = b.Reason
                }
            ).ToListAsync();
            return bonusSalary;
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

        public async Task<List<object>> GetBonusSalaryByIdAsync(int id)
        {
            var bonusSalary = await (
                from b in _context.BonusSalaryHistories
                join e in _context.Employees on b.EmployeeId equals e.Id
                where e.Id == id
                select new
                {
                    b.Id,
                    EmployeeId = b.EmployeeId,
                    FullName = e.FullName,
                    DateTime = b.Date,
                    TotalBonus = b.Bonus,
                    Reason = b.Reason
                }
            ).ToListAsync<object>();

            return bonusSalary;
        }
    }
}
