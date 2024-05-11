using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface IBonusSalary
    {
        Task<int> AddBonusSalaryForEmployeesAsync(BonusSalaryModel request);
        Task<object> GetAllBonusSalaryAsync();
        Task<List<object>> GetBonusSalaryByIdAsync(int id);
        Task<bool> DeleteBonusSalaryAsync(int id);
    }
}
