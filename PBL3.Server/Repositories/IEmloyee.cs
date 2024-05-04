using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public interface IEmployee
    {
        public Task<List<EmployeeModel>> GetAllEmployeesAsync();

<<<<<<< HEAD
        public Task<EmployeeModel> GetEmployeeByIdAsync(int id);
        public Task<List<EmployeeModel>> GetAllEmployeesByStatusAsync(bool status);
        public Task<int> AddEmployeeAsync(EmployeeModel employee);
        public Task<EmployeeModel> UpdateEmployeeAsync(EmployeeModel employee);
        public Task<bool> DeleteEmployeeAsync(int id);
=======
        public Task<object> GetEmployeeByIdAsync(int id);
        public Task<List<EmployeeSummaryModel>> GetAllEmployeesByStatusAsync(bool status);
        public Task<int> AddEmployeeAsync(EmloyeeModel employee);
        public Task<EmloyeeModel> UpdateEmployeeAsync(EmloyeeModel employee);
        public Task<Employee> DeleteEmployeeAsync(int id);
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
    }
}