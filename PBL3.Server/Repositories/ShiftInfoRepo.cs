using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Globalization;

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
                            Id = shiftInfo.Id,
                            //ManagerId = shiftInfo.ManagerId,
                            ShiftName = shiftInfo.ShiftName,
                            Date = shiftInfo.Date,
                            StartTime = shiftInfo.StartTime,
                            EndTime = shiftInfo.EndTime,
                            Checked = shiftInfo.Checked,
                            FullName = employee.FullName
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
                Id = shiftInfo.Id,
                ShiftName = shiftInfo.ShiftName,
                Date = shiftInfo.Date,
                StartTime = shiftInfo.StartTime,
                EndTime = shiftInfo.EndTime,
                Checked = shiftInfo.Checked,
                FullName = employee.FullName
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
            var shifts = await _context.ShiftInfos
                .Where(s => s.Date.Date == date.Date)
                .Select(s => new
                {
                    s.Id,
                    s.ShiftName,
                    s.Date,
                    s.StartTime,
                    s.EndTime,
                    Employees = _context.Employees
                    .Where(e => e.Id == s.ManagerId)
                        .Select(e => new
                        {
                            e.Id,
                            e.FullName
                        })
                        .FirstOrDefault()
                })
                .ToListAsync();
            if (shifts.Count == 0)
            {
                return null;
            }
            return shifts;
        }
    }
}
