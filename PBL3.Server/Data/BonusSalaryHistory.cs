using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("BonusSalaryHistory")]
    public class BonusSalaryHistory
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }
        public DateTime DateTime {  get; set; }
        [Range(0, int.MaxValue)]
        public int TotalBonus { get; set; }
        public string? Reason { get; set; }
    }
}
