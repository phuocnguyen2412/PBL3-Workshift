using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PBL3.Server.Data
{
    [Table("SalaryHistory")]
    public class SalaryHistory
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double TotalHours { get; set; }
        public int TotalBonus { get; set; }
        public int TotalViolate { get; set; }
        public double TotalSalary { get; set; }
        public DateTime PaidDate { get; set; }
    }
}
