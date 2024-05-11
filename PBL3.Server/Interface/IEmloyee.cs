using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public interface IEmployee
    {
        public Task<object> GetAllEmployeesAsync();
        public Task<object> GetEmployeeByIdAsync(int id);
        public Task<object> GetAllEmployeesByStatusAsync(bool status);
        public Task<Employee> AddEmployeeAsync(EmployeeModel employee);
        public Task<EmployeeModel> UpdateEmployeeAsync(EmployeeModel employee);
        public Task<EmployeeModel> DeleteEmployeeAsync(int id);
        public Task<object> SearchEmployeeByStringAsync(string searchString);
    }
}