using Microsoft.EntityFrameworkCore.Metadata;
using PBL3.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Models
{
    [Table("SalaryHistory")]
    public class SalaryHistory
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public int TotalHours { get; set; }
        [Required]
        public int TotalBonus { get; set; }
        [Required]
        public int TotalViolate { get; set; }
        [Required]
        public int TotalSalary { get; set; }
        [Required]
        public DateTime PaidDate { get; set; }
    }
}
