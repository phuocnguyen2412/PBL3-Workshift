using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class EmloyeeModel
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
<<<<<<< HEAD
        public bool? TypeOfEmployee { get; set; }
        public double SalaryCoefficients { get; set; }
=======
        public bool? TypeOfEmployee { get; set; } 
        public double CoefficientsSalary { get; set; }
>>>>>>> 909ddd8535f3d5d43a8d705c68909f8a2724094e
        public int DutyId { get; set; }
        public bool? Status { get; set; }
    }
}
