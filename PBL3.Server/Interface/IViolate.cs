using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Interface
{
    public interface IViolate
    {
        Task<object> GetAllViolates();
        Task<object> GetViolateById(int id);
        Task<object> GetViolateByEmployeeId(int employeeid);
        Task<object> GetViolateByManagerId(int managerid);
        Task<Violate> AddViolate(ViolateModel model);
        Task<bool> UpdateViolateChecked(int id, bool isChecked);
    }
}