using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public interface IEmployee
    {
        public Task<List<EmployeeModel>> GetAllEmployeesAsync();
        public Task<List<EmployeeModel>> GetEmployeeByIdAsync(int id);
        public Task<List<EmployeeModel>> GetAllEmployeesByStatusAsync(bool status);
        public Task<int> AddEmployeeAsync(EmployeeModel employee);
        public Task<EmployeeModel> UpdateEmployeeAsync(EmployeeModel employee);
        public Task<Employee> DeleteEmployeeAsync(int id);
    }
}