using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class EmployeeModel
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? TypeOfEmployee { get; set; }
        public double SalaryCoefficients { get; set; }
        public int DutyId { get; set; }
        public bool? Status { get; set; }
    }
}
