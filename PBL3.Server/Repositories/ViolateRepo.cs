using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public class ViolateRepo : IViolate
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public ViolateRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<object> GetAllViolates()
        {
            var violates = await (
                from v in _context.Violates
                join e in _context.Employees on v.EmployeeId equals e.Id
                join s in _context.ShiftInfos on v.ShiftInfoId equals s.Id
                join m in _context.Employees on s.ManagerId equals m.Id into managers
                from manager in managers.DefaultIfEmpty()
                select new
                {
                    v.Id,
                    EmployeeName = e.FullName,
                    v.Handle,
                    v.Reason,
                    v.Checked,
                    s.ShiftName,
                    s.StartTime,
                    s.EndTime,
                    s.Date,
                    ManagerName = manager != null ? manager.FullName : "N/A"
                }
            ).ToListAsync();

            return violates;
        }

        public async Task<object> GetViolateById(int id)
        {
            var violate = await (
                from v in _context.Violates
                join e in _context.Employees on v.EmployeeId equals e.Id
                join s in _context.ShiftInfos on v.ShiftInfoId equals s.Id
                join m in _context.Employees on s.ManagerId equals m.Id into managers
                from manager in managers.DefaultIfEmpty()
                where v.Id == id
                select new
                {
                    v.Id,
                    EmployeeName = e.FullName,
                    v.Handle,
                    v.Reason,
                    v.Checked,
                    s.ShiftName,
                    s.StartTime,
                    s.EndTime,
                    s.Date,
                    ManagerName = manager != null ? manager.FullName : "N/A"
                }
            ).FirstOrDefaultAsync();

            return violate;
        }

        public async Task<object> GetViolateByEmployeeId(int employeeid)
        {
            var violate = await (
                from v in _context.Violates
                join e in _context.Employees on v.EmployeeId equals e.Id
                join s in _context.ShiftInfos on v.ShiftInfoId equals s.Id
                join m in _context.Employees on s.ManagerId equals m.Id into managers
                from manager in managers.DefaultIfEmpty()
                where e.Id == employeeid
                select new
                {
                    v.Id,
                    EmployeeName = e.FullName,
                    v.Handle,
                    v.Reason,
                    v.Checked,
                    s.ShiftName,
                    s.StartTime,
                    s.EndTime,
                    s.Date,
                    ManagerName = manager != null ? manager.FullName : "N/A"
                }
            ).ToListAsync();

            return violate;
        }

        public async Task<object> GetViolateByManagerId(int managerid)
        {
            var violate = await (
                from v in _context.Violates
                join e in _context.Employees on v.EmployeeId equals e.Id
                join s in _context.ShiftInfos on v.ShiftInfoId equals s.Id
                join m in _context.Employees on s.ManagerId equals m.Id into managers
                from manager in managers.DefaultIfEmpty()
                where s.ManagerId == managerid
                select new
                {
                    v.Id,
                    EmployeeName = e.FullName,
                    v.Handle,
                    v.Reason,
                    v.Checked,
                    s.ShiftName,
                    s.StartTime,
                    s.EndTime,
                    s.Date,
                    ManagerName = manager != null ? manager.FullName : "N/A"
                }
            ).ToListAsync();

            return violate;
        }

        public async Task<object> GetViolateByDate(DateTime date)
        {
            var violate = await (
                from v in _context.Violates
                join e in _context.Employees on v.EmployeeId equals e.Id
                join s in _context.ShiftInfos on v.ShiftInfoId equals s.Id
                join m in _context.Employees on s.ManagerId equals m.Id into managers
                from manager in managers.DefaultIfEmpty()
                where s.Date == date
                select new
                {
                    s.ManagerId,
                    v.Id,
                    EmployeeName = e.FullName,
                    v.Handle,
                    v.Reason,
                    v.Checked,
                    s.ShiftName,
                    s.StartTime,
                    s.EndTime,
                    s.Date,
                    ManagerName = manager != null ? manager.FullName : "N/A"
                }
            ).FirstOrDefaultAsync();

            return violate;
        }

        public async Task<Violate> AddViolate(ViolateModel model)
        {
            var violates = await (
                from si in _context.ShiftInfos
                join s in _context.Shifts on si.Id equals s.ShiftInfoId
                where si.Id == model.ShiftInfoId
                select new { s.EmployeeId }
            ).ToListAsync();

            if (violates.Any(v => v.EmployeeId == model.EmployeeId))
            {
                var violate = _mapper.Map<Violate>(model);
                _context.Violates.Add(violate);
                await _context.SaveChangesAsync();
                return violate;
            }
            else
            {
                throw new Exception("This employee does not exist during the shift!");
            }
        }

        public async Task<bool> UpdateViolateChecked(int id, bool isChecked)
        {
            var violate = await _context.Violates.FindAsync(id);
            if (violate == null)
                return false;

            violate.Checked = isChecked;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
