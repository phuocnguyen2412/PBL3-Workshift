using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public interface IEmployee
    {
        public Task<List<EmloyeeModel>> GetEmployee();
        public Task<object> GetEmployeeById(int id);
        public Task<int> AddEmployee(EmloyeeModel employee);
        public Task<EmloyeeModel> UpdateEmployee(EmloyeeModel employee);
        public Task<bool> DeleteEmployee(int id);

    }
}