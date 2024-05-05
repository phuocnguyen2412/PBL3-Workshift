using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public interface IEmployee
    {
<<<<<<< HEAD
        public Task<List<EmloyeeModel>> GetEmployee();
        public Task<object> GetEmployeeById(int id);
        public Task<int> AddEmployee(EmloyeeModel employee);
        public Task<EmloyeeModel> UpdateEmployee(EmloyeeModel employee);
        public Task<bool> DeleteEmployee(int id);

=======
        public Task<List<EmployeeSummaryModel>> GetAllEmployeesAsync();

        public Task<object> GetEmployeeByIdAsync(int id);
        public Task<List<EmployeeSummaryModel>> GetAllEmployeesByStatusAsync(bool status);
        public Task<int> AddEmployeeAsync(EmloyeeModel employee);
        public Task<EmloyeeModel> UpdateEmployeeAsync(EmloyeeModel employee);
        public Task<Employee> DeleteEmployeeAsync(int id);
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
    }
}