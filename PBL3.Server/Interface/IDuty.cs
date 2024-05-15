using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface IDuty
    {
        Task<List<DutyModel>> GetAllDutiesAsync();
  
        Task<DutyModel> AddDutyAsync(DutyModel dutyModel);
        Task UpdateDutyAsync(DutyModel dutyModel);
        Task DeleteDutyAsync(int id);
    }
}
