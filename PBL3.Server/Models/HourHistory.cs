
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    [Table("HourHistory")]
    public class HourHistory
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
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
