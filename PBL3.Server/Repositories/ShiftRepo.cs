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
    public class ShiftRepo : IShift
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public ShiftRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ShiftModel> AddShiftAsync(ShiftModel shiftModel)
        {
            var shiftInfo = await _context.ShiftInfos.FindAsync(shiftModel.ShiftInfoId);
            if (shiftInfo == null)
            {
                throw new InvalidOperationException("ShiftInfo not found.");
            }

            if (shiftInfo.Checked)
            {
                throw new InvalidOperationException("Cannot register for the shift as the form is closed.");
            }

            bool shiftExists = await (
                from s in _context.Shifts
                where s.ShiftInfoId == shiftModel.ShiftInfoId && s.EmployeeId == shiftModel.EmployeeId
                select s
            ).AnyAsync();
            if (shiftExists)
            {
                throw new InvalidOperationException("Employee is already assigned to this shift.");
            }

            var shift = _mapper.Map<Shift>(shiftModel);
            _context.Shifts.Add(shift);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftModel>(shift);
        }



        public async Task<ShiftModel> DeleteShiftAsync(int id)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return null;
            }

            _context.Shifts.Remove(shift);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftModel>(shift);
        }

        public async Task<object> GetAllShiftAsync()
        {
            var shifts = await _context.Shifts.ToListAsync();
            return shifts;
        }

        public async Task<object> GetShiftByIdAsync(int id)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return null;
            }
            return shift;
        }

        public async Task<ShiftModel> UpdateShiftAsync(ShiftModel shiftModel)
        {
            var shift = await _context.Shifts.FindAsync(shiftModel.Id);
            if (shift == null)
            {
                return null;
            }

            _mapper.Map(shiftModel, shift);

            _context.Shifts.Update(shift);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftModel>(shift);
        }

        public async Task<ShiftModel> UpdateShiftCheckInTimeAsync(int id, TimeSpan checkInTime)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return null;
            }

            shift.CheckInTime = checkInTime;

            _context.Shifts.Update(shift);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftModel>(shift);
        }

        public async Task<ShiftModel> UpdateShiftCheckOutTimeAsync(int Employeeid, int shiftInfoId, TimeSpan checkOutTime)
        {
            var shift = await _context.Shifts.Include(s => s.ShiftInfo)
                             .Where(s => s.EmployeeId == Employeeid && s.ShiftInfoId == shiftInfoId)
                             .FirstOrDefaultAsync();

            if (shift == null)
            {
                return null;
            }

            shift.CheckOutTime = checkOutTime;

            var totalHours = (checkOutTime - shift.CheckInTime).TotalHours;

            var totalHoursFormatted = totalHours.ToString("0.##");

            var hourHistory = new HourHistory
            {
                EmployeeId = shift.EmployeeId,
                DateAt = shift.ShiftInfo.Date,
                HoursPerDay = totalHoursFormatted
            };

            _context.HourHistories.Add(hourHistory);
            await _context.SaveChangesAsync();

            _context.Shifts.Update(shift);
            await _context.SaveChangesAsync();

            return _mapper.Map<ShiftModel>(shift);
        }


    }
}
