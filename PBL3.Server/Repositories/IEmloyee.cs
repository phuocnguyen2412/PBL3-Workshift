using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public interface IEmployee
    {
<<<<<<< Updated upstream
        public Task<List<EmloyeeModel>> GetEmployee();
        public Task<EmloyeeModel> GetEmployeeById(int id);
        public Task<int> AddEmployee(EmloyeeModel employee);
        public Task<EmloyeeModel> UpdateEmployee(EmloyeeModel employee);
        public Task<bool> DeleteEmployee(int id);
=======
        public Task<List<EmployeeSummaryModel>> GetAllEmployeesAsync();
        public Task<object> GetEmployeeByIdAsync(int id);
        public Task<List<EmployeeSummaryModel>> GetAllEmployeesByStatusAsync(bool status);
        public Task<int> AddEmployeeAsync(EmloyeeModel employee);
        public Task<EmloyeeModel> UpdateEmployeeAsync(EmloyeeModel employee);
        public Task<bool> DeleteEmployeeAsync(int id);
>>>>>>> Stashed changes
    }
}