using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PBL3.Server.Repositories
{
    public interface IEmployee
    {
        public Task<ActionResult> GetAllEmployeesAsync();
        public Task<ActionResult> GetEmployeeByIdAsync(int id);
        public Task<ActionResult> GetAllEmployeesByStatusAsync(bool status);
        public Task<Employee> AddEmployeeAsync(EmployeeModel employee);
        public Task<ActionResult> UpdateEmployeeAsync(EmployeeModel employee);
        public Task<ActionResult> DeleteEmployeeAsync(int id);
        public Task<ActionResult> SearchEmployeeByStringAsync(string searchString);
    }
}