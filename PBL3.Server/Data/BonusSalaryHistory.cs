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
        public virtual Employee? Employee { get; set; }
        public DateTime Date {  get; set; }

        [Range(0, int.MaxValue)]
        public int Bonus { get; set; }
        public string? Reason { get; set; }
    }
}
