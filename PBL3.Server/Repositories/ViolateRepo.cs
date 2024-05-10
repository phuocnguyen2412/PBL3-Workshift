using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
            var violates = await (from v in _context.Violates
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
                                  }).ToListAsync();

            return violates;
        }

        public async Task<object> GetViolateById(int id)
        {
            var violate = await (from v in _context.Violates
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
                                 }).FirstOrDefaultAsync();

            return violate;
        }

        public async Task<object> GetViolateByEmployeeId(int employeeid)
        {
            var violate = await (from v in _context.Violates
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
                                 }).FirstOrDefaultAsync();

            return violate;
        }

        public async Task<int> AddViolate(ViolateModel violatemodel)
        {
            var violate = _mapper.Map<Violate>(violatemodel);
            _context.Violates.Add(violate);
            await _context.SaveChangesAsync();
            return violate.Id;
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