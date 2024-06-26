﻿using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface IBonusSalary
    {
        Task<int> AddBonusSalaryForEmployeesAsync(BonusSalaryModel model);
        Task<object> GetAllBonusSalaryAsync();
        Task<List<object>> GetBonusSalaryByEmployeeIdAsync(int id);
        Task<bool> DeleteBonusSalaryAsync(int id);
        Task<List<object>> GetAllBonusSalaryByDateAsync(DateTime date);
    }
}
