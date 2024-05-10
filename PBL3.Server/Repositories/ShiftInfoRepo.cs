using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using Microsoft.AspNetCore.Mvc;
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
            var shiftInfosWithFullName = await _context.ShiftInfos
                .Join(_context.Employees,
                        shiftInfo => shiftInfo.ManagerId,
                        employee => employee.Id,
                        (shiftInfo, employee) => new
                        {
                            shiftInfo.Id,
                            //ManagerId = shiftInfo.ManagerId,
                            shiftInfo.ShiftName,
                            shiftInfo.Date,
                            shiftInfo.StartTime,
                            shiftInfo.EndTime,
                            shiftInfo.Checked,
                            employee.FullName
                        })
                .ToListAsync();
            return shiftInfosWithFullName;
        }


        public async Task<object> GetShiftInfoByIdAsync(int id)
        {
            var shiftInfo = await _context.ShiftInfos!.FindAsync(id);
            if (shiftInfo == null)
            {
                return null;
            }

            var employee = await _context.Employees!.FindAsync(shiftInfo.ManagerId);
            if (employee == null)
            {
                return null;
            }

            return new
            {
                shiftInfo.Id,
                shiftInfo.ShiftName,
                shiftInfo.Date,
                shiftInfo.StartTime,
                shiftInfo.EndTime,
                shiftInfo.Checked,
                employee.FullName
            };
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
            var shiftInfos = await (from shiftInfo in _context.ShiftInfos
                                    join shift in _context.Shifts on shiftInfo.Id equals shift.ShiftInfoId
                                    join employee in _context.Employees on shift.EmployeeId equals employee.Id
                                    where shiftInfo.Date == date
                                    select new
                                    {
                                        shiftInfo.Id,
                                        shiftInfo.ShiftName,
                                        shiftInfo.Date,
                                        shiftInfo.StartTime,
                                        shiftInfo.EndTime,
                                        shiftInfo.Checked,
                                        Employees = (from employee in _context.Employees
                                                     join duty in _context.Duties on employee.DutyId equals duty.Id
                                                     select new
                                                     {
                                                         employee.Id,
                                                         employee.FullName,
                                                         duty.DutyName,
                                                         employee.TypeOfEmployee
                                                     }).ToList<object>()
                                    }).ToListAsync();

            if (shiftInfos.Count == 0)
            {
                return null;
            }

            return shiftInfos;
        }

        public async Task<List<DateTime>> GetWorkDatesForEmployeeAsync(int employeeId)
        {
            return await _context.ShiftInfos
                .Where(shiftInfo => shiftInfo.ManagerId == employeeId)
                .Select(shiftInfo => shiftInfo.Date)
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<ShiftInfoModel>> GetShiftsForManagerAsync(int managerId)
        {
            var shiftInfos = await _context.ShiftInfos
                .Where(shiftInfo => shiftInfo.ManagerId == managerId)
                .ToListAsync();
            return _mapper.Map<List<ShiftInfoModel>>(shiftInfos);
        }
    }
}
