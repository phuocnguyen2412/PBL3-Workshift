using Microsoft.EntityFrameworkCore.Metadata;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("SalaryHistory")]
    public class SalaryHistory
    {
        [Key]
<<<<<<< HEAD
        public int SalaryHistoryId { get; set; }

    
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }

  
        public DateTime StartDate { get; set; }

   
        public DateTime EndDate { get; set; }

        public int TotalHours { get; set; }

    
        public int TotalBonus { get; set; }


        public int TotalViolate { get; set; }

   
        public int TotalSalary { get; set; }

     
=======
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalHours { get; set; }
        public int TotalBonus { get; set; }
        public int TotalViolate { get; set; }
        public int TotalSalary { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public DateTime PaidDate { get; set; }
    }
}
