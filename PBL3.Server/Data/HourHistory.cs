
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("HourHistory")]
    public class HourHistory
    {
        [Key]
        public int HourHistoryId { get; set; }

        [Required]
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }

        [Required]
        public string? HoursPerDay { get; set; }

        [Required]
        public DateTime DateAt { get; set; }
    }
}
