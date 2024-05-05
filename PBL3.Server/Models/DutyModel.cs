using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class DutyModel
    {
        public int Id { get; set; }
        public string? DutyName { get; set; }
        public double BasicSalary { get; set; }
        public ICollection<EmployeeModel> Employees { get; set; }
    }
}
