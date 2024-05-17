using PBL3.Server.Data;
using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface ISalaryHistory
    {
        Task<object> GetAllSalaryHistory();
        Task<object> GetAllSalaryHistoryById(int Id);
        Task<object> GetAllSalaryHistoryByEmployeeId(int Id);
        Task<List<SalaryHistory>> AddSalaryHistory(SalaryHistoryModel model);
        Task UpdateSalaryById(int id);

    }
}
