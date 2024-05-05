using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("BonusSalaryHistory")]
    public class BonusSalaryHistory
    {
        [Key]
<<<<<<< HEAD
        public int BonusSalaryHistoryId { get; set; }


=======
        public int Id { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        [Range(0, int.MaxValue)]
        public int? TotalBonus { get; set; }
        public string? Reason { get; set; }
    }
}
