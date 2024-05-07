using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface IShiftInfo
    {
        public Task<List<ShiftInfoModel>> GetAllShiftInfoAsync();
        public Task<ShiftInfoModel> GetShiftInfoByIdAsync(int id);
        public Task<ShiftInfoModel> AddShiftInfoAsync(ShiftInfoModel shiftInfo);
        public Task<ShiftInfoModel> UpdateShiftInfoAsync(ShiftInfoModel shiftInfo);
        public Task<ShiftInfoModel> UpdateShiftInfoCheckedAsync(int id, bool isChecked);
        public Task<bool> DeleteShiftInfoAsync(int id);
    }
}
