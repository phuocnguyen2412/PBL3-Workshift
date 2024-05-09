using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Interface
{
    public interface IShift
    {
        public Task<object> GetAllShiftAsync();
        public Task<object> GetShiftByIdAsync(int id);
        public Task<ShiftModel> AddShiftAsync(ShiftModel shift);
        public Task<ShiftModel> UpdateShiftAsync(ShiftModel shift);
        public Task<ShiftModel> UpdateShiftCheckInTimeAsync(int id, string checkInTime);
        public Task<ShiftModel> UpdateShiftCheckOutTimeAsync(int id, string checkOutTime);
        public Task<ShiftModel> DeleteShiftAsync(int id);

    }
}
