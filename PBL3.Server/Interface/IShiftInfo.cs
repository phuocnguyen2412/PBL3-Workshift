﻿using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface IShiftInfo
    {
        public Task<object> GetAllShiftInfoAsync();
        public Task<object> GetShiftInfoByIdAsync(int id);
        public Task<ShiftInfoModel> AddShiftInfoAsync(ShiftInfoModel shiftInfo);
        public Task<ShiftInfoModel> UpdateShiftInfoAsync(ShiftInfoModel shiftInfo);
        public Task<ShiftInfoModel> UpdateShiftInfoCheckedAsync(int id, bool isChecked);
        public Task<ShiftInfoModel> DeleteShiftInfoAsync(int id);
        public Task<object> GetShiftsAndEmployeesByDateAsync(DateTime date);
    }
}