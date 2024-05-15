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
    public class ShiftInfoRepo : IShiftInfo
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public ShiftInfoRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<object> GetAllShiftInfoAsync()
        {
            var shiftInfos = await (
                from shiftInfo in _context.ShiftInfos
                join employee in _context.Employees
                    on shiftInfo.ManagerId equals employee.Id
                    into shiftManager
                from manager in shiftManager.DefaultIfEmpty()
                select new
                {
                    shiftInfo.Id,
                    shiftInfo.ShiftName,
                    shiftInfo.Date,
                    shiftInfo.StartTime,
                    shiftInfo.EndTime,
                    shiftInfo.Checked,
                    ManagerName = manager != null ? manager.FullName : "No Manager"
                }
            ).ToListAsync();
            return shiftInfos;
        }

        public async Task<object> GetShiftInfoByIdAsync(int id)
        {
            var shiftInfos = await (
                from shiftInfo in _context.ShiftInfos
                where shiftInfo.Id == id
                join employee in _context.Employees
                    on shiftInfo.ManagerId equals employee.Id
                    into shiftManager
                from manager in shiftManager.DefaultIfEmpty()
                select new
                {
                    shiftInfo.Id,
                    shiftInfo.ShiftName,
                    shiftInfo.Date,
                    shiftInfo.StartTime,
                    shiftInfo.EndTime,
                    shiftInfo.Checked,
                    ManagerName = manager != null ? manager.FullName : "No Manager"
                }
            ).FirstOrDefaultAsync();
            return shiftInfos;
        }

        public async Task<ShiftInfoModel> AddShiftInfoAsync(ShiftInfoModel shiftInfoModel)
        {
            var shiftInfoEntity = _mapper.Map<ShiftInfo>(shiftInfoModel);
            _context.ShiftInfos!.Add(shiftInfoEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftInfoModel>(shiftInfoEntity);
        }

        public async Task<ShiftInfoModel?> UpdateShiftInfoAsync(ShiftInfoModel shiftInfoModel)
        {
            var existingShiftInfo = await _context.ShiftInfos!.FindAsync(shiftInfoModel.Id);
            if (existingShiftInfo == null)
            {
                return null;
            }
            _mapper.Map(shiftInfoModel, existingShiftInfo);

            _context.ShiftInfos.Update(existingShiftInfo);
            await _context.SaveChangesAsync();

            return _mapper.Map<ShiftInfoModel>(existingShiftInfo);
        }

        public async Task<ShiftInfoModel> UpdateShiftInfoCheckedAsync(int id, bool isChecked)
        {
            var shiftInfo = await _context.ShiftInfos!.FindAsync(id);
            if (shiftInfo == null)
            {
                return null;
            }

            shiftInfo.Checked = isChecked;
            _context.ShiftInfos!.Update(shiftInfo);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftInfoModel>(shiftInfo);
        }

        public async Task<ShiftInfoModel> DeleteShiftInfoAsync(int id)
        {
            var shiftInfo = await _context.ShiftInfos!.FindAsync(id);
            if (shiftInfo == null)
            {
                return null;
            }

            _context.ShiftInfos!.Remove(shiftInfo);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftInfoModel>(shiftInfo);
        }

        public async Task<object> GetShiftsAndEmployeesByDateAsync(DateTime date)
        {
            var shiftInfos = await (
                from shiftInfo in _context.ShiftInfos

                where shiftInfo.Date == date
                select new
                {
                    shiftInfo.Id,
                    shiftInfo.ShiftName,
                    shiftInfo.Date,
                    shiftInfo.StartTime,
                    shiftInfo.EndTime,
                    shiftInfo.Checked,
                    Employees = (
                        from Shift in _context.Shifts

                        join employee in _context.Employees on Shift.EmployeeId equals employee.Id
                        join duty in _context.Duties on employee.DutyId equals duty.Id
                        where shiftInfo.Id == Shift.ShiftInfoId
                        select new
                        {
                            ShiftId = Shift.Id,
                            EmployeeId = employee.Id,
                            employee.FullName,
                            duty.DutyName,
                            employee.TypeOfEmployee
                        }
                    ).ToList<object>()
                }
            ).ToListAsync();

            return shiftInfos;
        }

        public async Task<List<ShiftInfoModel>> GetWorkDatesForEmployeeAsync(int employeeId)
        {
            var shiftInfos =
                from shiftInfo in _context.ShiftInfos
                join shift in _context.Shifts on shiftInfo.Id equals shift.ShiftInfoId
                where shift.EmployeeId == employeeId
                select new ShiftInfoModel
                {
                    Id = shiftInfo.Id,
                    ShiftName = shiftInfo.ShiftName,
                    Date = shiftInfo.Date,
                    StartTime = shiftInfo.StartTime,
                    EndTime = shiftInfo.EndTime,
                    Checked = shiftInfo.Checked
                };
            return _mapper.Map<List<ShiftInfoModel>>(shiftInfos);
        }

        public async Task<List<ShiftInfoModel>> GetShiftsForManagerAsync(int managerId)
        {
            var shiftInfos =
                from shiftInfo in _context.ShiftInfos
                where shiftInfo.ManagerId == managerId
                select new ShiftInfoModel
                {
                    Id = shiftInfo.Id,
                    ShiftName = shiftInfo.ShiftName,
                    Date = shiftInfo.Date,
                    StartTime = shiftInfo.StartTime,
                    EndTime = shiftInfo.EndTime,
                    Checked = shiftInfo.Checked
                };
            return _mapper.Map<List<ShiftInfoModel>>(shiftInfos);
        }
    }
}
