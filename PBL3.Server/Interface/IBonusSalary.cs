using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface IBonusSalary
    {
        Task<List<BonusSalaryModel>> GetAllBonusSalaries();
        Task<int> AddBonusSalaryAsync(BonusSalaryModel model);
        Task UpdateBonusSalaryAsync(BonusSalaryModel model);

    }
}
