using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public interface IDuty
    {
        Task<List<DutyModel>> GetAllDutiesAsync();
        Task<DutyModel> GetDutyByIdAsync(int id);
        Task<int> AddDutyAsync(DutyModel dutyModel);
        Task UpdateDutyAsync(DutyModel dutyModel);
        Task DeleteDutyAsync(int id);
    }
}
