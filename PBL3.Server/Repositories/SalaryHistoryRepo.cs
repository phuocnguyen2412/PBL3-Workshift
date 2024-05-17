using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public class SalaryHistoryRepo : ISalaryHistory
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public SalaryHistoryRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<object> GetAllSalaryHistory()
        {
            var salaryHistories = await (
                from sh in _context.SalaryHistories
                join e in _context.Employees on sh.EmployeeId equals e.Id
                join d in _context.Duties on e.DutyId equals d.Id
                select new
                {
                    e.Id,
                    e.FullName,
                    d.DutyName,
                    d.BasicSalary,
                    e.CoefficientsSalary,
                    sh.StartDate,
                    sh.EndDate,
                    sh.TotalHours,
                    sh.TotalBonus,
                    sh.TotalViolate,
                    sh.TotalSalary,
                    sh.PaidDate
                }
            ).ToListAsync();
            return salaryHistories;
        }

        public async Task<object> GetAllSalaryHistoryById(int Id)
        {
            var salaryHistories = await (
                from sh in _context.SalaryHistories
                join e in _context.Employees on sh.EmployeeId equals e.Id
                join d in _context.Duties on e.DutyId equals d.Id
                where sh.Id == Id
                select new
                {
                    e.Id,
                    e.FullName,
                    d.DutyName,
                    d.BasicSalary,
                    e.CoefficientsSalary,
                    sh.StartDate,
                    sh.EndDate,
                    sh.TotalHours,
                    sh.TotalBonus,
                    sh.TotalViolate,
                    sh.TotalSalary,
                    sh.PaidDate
                }
            ).ToListAsync();

            return salaryHistories;
        }

        public async Task<object> GetAllSalaryHistoryByEmployeeId(int Id)
        {
            var salaryHistories = await (
                from sh in _context.SalaryHistories
                join e in _context.Employees on sh.EmployeeId equals e.Id
                join d in _context.Duties on e.DutyId equals d.Id
                where e.Id == Id
                select new
                {
                    e.Id,
                    e.FullName,
                    d.DutyName,
                    d.BasicSalary,
                    e.CoefficientsSalary,
                    sh.StartDate,
                    sh.EndDate,
                    sh.TotalHours,
                    sh.TotalBonus,
                    sh.TotalViolate,
                    sh.TotalSalary,
                    sh.PaidDate
                }
            ).ToListAsync();

            return salaryHistories;
        }

        public async Task<List<SalaryHistory>> AddSalaryHistory(SalaryHistoryModel model)
        {
            var newSalaryHistories = new List<SalaryHistory>();
            var employeeIdsToProcess =
                model.EmployeeIds != null
                && model.EmployeeIds.Any()
                && !model.EmployeeIds.Contains(0)
                    ? model.EmployeeIds
                    : await _context.Employees.Select(e => e.Id).ToListAsync();
            foreach (var employeeId in employeeIdsToProcess)
            {
                var result = await (
                    from e in _context.Employees
                    join d in _context.Duties on e.DutyId equals d.Id
                    where e.Id == employeeId
                    select new { e.CoefficientsSalary, d.BasicSalary, }
                ).FirstOrDefaultAsync();
                if (result != null)
                {
                    var totalHours = await CalculateTotalHours(
                        model.StartDate,
                        model.EndDate,
                        employeeId
                    );
                    var totalBonus = await CalculateTotalBonus(
                        model.StartDate,
                        model.EndDate,
                        employeeId
                    );
                    var totalViolate = await CalculateTotalViolate(
                        model.StartDate,
                        model.EndDate,
                        employeeId
                    );

                    var newSalaryHistory = new SalaryHistory
                    {
                        EmployeeId = employeeId,
                        StartDate = model.StartDate,
                        EndDate = model.EndDate,
                        TotalHours = totalHours,
                        TotalBonus = totalBonus,
                        TotalViolate = totalViolate,
                        TotalSalary = CalculateTotalSalary(
                            result.CoefficientsSalary,
                            result.BasicSalary,
                            totalHours,
                            totalBonus,
                            totalViolate
                        ),
                    };

                    newSalaryHistories.Add(newSalaryHistory);
                    _context.SalaryHistories.Add(newSalaryHistory);
                }
            }
            await _context.SaveChangesAsync();
            return newSalaryHistories;
        }

        private async Task<double> CalculateTotalHours(
            DateTime startDate,
            DateTime endDate,
            int employeeId
        )
        {
            var totalHours = await _context
                .HourHistories.Where(hh =>
                    hh.EmployeeId == employeeId && hh.Date >= startDate && hh.Date <= endDate
                )
                .SumAsync(hh => hh.HoursPerDay);

            return totalHours;
        }

        private async Task<int> CalculateTotalViolate(
            DateTime startDate,
            DateTime endDate,
            int employeeId
        )
        {
            var totalViolate = await (
                from v in _context.Violates
                join si in _context.ShiftInfos on v.ShiftInfoId equals si.Id
                join e in _context.Employees on v.EmployeeId equals e.Id
                where e.Id == employeeId && si.Date >= startDate && si.Date <= endDate
                select v.Handle
            ).SumAsync();

            return totalViolate;
        }

        private async Task<int> CalculateTotalBonus(
            DateTime startDate,
            DateTime endDate,
            int employeeId
        )
        {
            var totalBonus = await _context
                .BonusSalaryHistories
                .Where(bs =>
                    bs.EmployeeId == employeeId && bs.Date >= startDate && bs.Date <= endDate
                )
                .SumAsync(bs => bs.Bonus);

            return totalBonus;
        }

        private double CalculateTotalSalary(
            double coefficientsSalary,
            double basicSalary,
            double totalHours,
            int totalBonus,
            int totalViolate
        )
        {
            return (coefficientsSalary * basicSalary * totalHours) + totalBonus - totalViolate;
        }

        public async Task UpdateSalaryById(int id)
        {
            var salaryHistory = await _context.SalaryHistories.FindAsync(id);
            if (salaryHistory != null)
            {
                salaryHistory.PaidDate = DateTime.Now;

                await _context.SaveChangesAsync();
            }
        }
    }
}
