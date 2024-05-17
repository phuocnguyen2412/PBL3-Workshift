using System;
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
                throw new Exception("ShiftInfo not found.");
            }

            if (shiftInfo.Checked)
            {
                throw new Exception("Cannot register for the shift as the form is closed.");
            }

            // Get the DutyName of the employee
            var dutyName = await (
                from e in _context.Employees
                join d in _context.Duties on e.DutyId equals d.Id
                where e.Id == shiftModel.EmployeeId
                select d.DutyName
                ).FirstOrDefaultAsync();
            if (dutyName == "Manager")
            {
                if (shiftInfo.ManagerId != 0)
                {
                    throw new Exception("A manager is already assigned to this shift.");
                }

                bool managerShiftExists = await _context.Shifts.AnyAsync(s =>
                    s.ShiftInfoId == shiftModel.ShiftInfoId && s.EmployeeId == shiftModel.EmployeeId
                );
                if (managerShiftExists)
                {
                    throw new Exception("Manager is already assigned to this shift.");
                }

                // Update the ManagerId in the ShiftInfo table
                shiftInfo.ManagerId = shiftModel.EmployeeId;
                _context.ShiftInfos.Update(shiftInfo);
                await _context.SaveChangesAsync();
            }
            else if (dutyName == "Employee")
            {

                bool shiftExists = await (
                    from s in _context.Shifts
                    where
                        s.ShiftInfoId == shiftModel.ShiftInfoId && s.EmployeeId == shiftModel.EmployeeId
                    select s
                ).AnyAsync();
                if (shiftExists)
                {
                    throw new Exception("Employee is already assigned to this shift.");
                }
            }
            else if (dutyName == "Admin")
            {
                throw new Exception("Admin cannot be assigned to a shift.");
            }
            else
            {
                throw new Exception("Invalid DutyName.");
            }

            var shift = _mapper.Map<Shift>(shiftModel);
           
            _context.Shifts.Add(shift);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftModel>(shift);
        }


        public async Task<ShiftModel> DeleteShiftAsync(int shiftId)
        {
            var shiftDetails = await (
                from s in _context.Shifts
                join e in _context.Employees on s.EmployeeId equals e.Id
                join d in _context.Duties on e.DutyId equals d.Id
                join si in _context.ShiftInfos on s.ShiftInfoId equals si.Id
                //where s.Id == shiftId
                select new
                {
                    s.ShiftInfoId,
                    d.DutyName,
                    si.ManagerId
                }
            ).FirstOrDefaultAsync();

            if (shiftDetails == null)
            {
                throw new Exception("Shift not found.");
            }

            var shiftToDelete = await _context.Shifts.FindAsync(shiftId);
            if (shiftToDelete == null)
            {
                throw new Exception("Shift to delete not found.");
            }

            if (shiftDetails.DutyName == "Manager")
            {

                var shiftInfo = await _context.ShiftInfos.FindAsync(shiftDetails.ShiftInfoId);
                shiftInfo.ManagerId = 0;
                _context.ShiftInfos.Update(shiftInfo);
                await _context.SaveChangesAsync();
           
            }
            else if(shiftDetails.DutyName == "Employee")
            {
                _context.Shifts.Remove(shiftToDelete);
                await _context.SaveChangesAsync();
            }
            return _mapper.Map<ShiftModel>(shiftToDelete);

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

        public async Task<ShiftModel> UpdateShiftCheckInTimeAsync(int shiftId, int managerId)
        {
            var shift = await _context.Shifts.FindAsync(shiftId);
            if (shift == null)
            {
                return null;
            }

            var shiftInfo = await _context.ShiftInfos.FindAsync(shift.ShiftInfoId);
            if (shiftInfo == null || shiftInfo.ManagerId != managerId)
            {
                throw new Exception("Only the manager assigned to this shift can update the check-in time.");
            }

            DateTime date = DateTime.Now;
            shift.CheckInTime = date;

            _context.Shifts.Update(shift);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftModel>(shift);
        }


        public async Task<ShiftModel> UpdateShiftCheckOutTimeAsync(int shiftId, int managerId)
        {
            var shift = await _context.Shifts.FindAsync(shiftId);
            if (shift == null)
            {
                return null;
            }



            var shiftInfo = await _context.ShiftInfos.FindAsync(shift.ShiftInfoId);
            if (shiftInfo == null || shiftInfo.ManagerId != managerId)
            {
                throw new Exception("Only the manager assigned to this shift can update the check-out time.");
            }

            TimeSpan checkInTime = shift.CheckInTime.TimeOfDay;

            if(checkInTime < shiftInfo.StartTime)
            {
                throw new Exception("Check-out time cannot be earlier than check-in time.");
            }

            DateTime date = DateTime.Now;
            shift.CheckOutTime = date;

            _context.Shifts.Update(shift);
            await _context.SaveChangesAsync();

            var totalHours = (date - shift.CheckInTime).TotalHours;
            var totalHoursFormatted = Convert.ToDouble(totalHours);
            var hourHistory = new HourHistory
            {
                EmployeeId = shift.EmployeeId,
                Date = shiftInfo.Date,
                HoursPerDay = totalHoursFormatted
            };
            _context.HourHistories.Add(hourHistory);
            await _context.SaveChangesAsync();

            return _mapper.Map<ShiftModel>(shift);
        }

    }
}
