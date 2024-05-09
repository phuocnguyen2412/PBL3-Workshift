using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Interface
{
    public interface IViolate
    {
        Task<IEnumerable<ViolateModel>> GetAllViolates();
        Task<ViolateModel> GetViolateById(int id);
        Task<int> AddViolate(ViolateModel violatemodel);
        Task<ViolateModel> UpdateViolate(int id, ViolateModel violateModel);
    }
}