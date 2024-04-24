using PBL3.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Models
{
    [Table("BonusSalaryHistory")]
    public class BonusSalaryHistory
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        [Required]
        public int EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }
        [Required]
        public string? TotalBonus { get; set; }
        [Required]
        public string? Reason { get; set; }
    }
}
