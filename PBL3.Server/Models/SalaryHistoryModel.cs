using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class SalaryHistoryModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalHours { get; set; }
        public int TotalBonus { get; set; }
        public int TotalViolate { get; set; }
        public int TotalSalary { get; set; }
        public DateTime PaidDate { get; set; }
    }
}
