using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public interface IEmployee
    {
        public Task<List<EmployeeSummaryModel>> GetAllEmployeesAsync();

        public Task<object> GetEmployeeByIdAsync(int id);
        public Task<List<EmployeeSummaryModel>> GetAllEmployeesByStatusAsync(bool status);
        public Task<int> AddEmployeeAsync(EmloyeeModel employee);
        public Task<EmloyeeModel> UpdateEmployeeAsync(EmloyeeModel employee);
        public Task<Employee> DeleteEmployeeAsync(int id);
    }
}