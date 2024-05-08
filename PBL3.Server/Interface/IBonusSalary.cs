using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface IBonusSalary
    {
        Task<int> AddBonusSalaryForEmployeesAsync(BonusSalaryRequest request);
        Task<ActionResult> GetAllBonusSalaryAsync();
        Task<bool> DeleteBonusSalaryAsync(int id);
    }
}
