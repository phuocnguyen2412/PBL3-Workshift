using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    [Table("ShiftInfo")]
    public class ShiftInfo
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        [Required]
        public string? ShiftName { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public TimeSpan StartTime { get; set; }
        [Required]
        public TimeSpan EndTime { get; set; }
        [Required]
        public bool Checked { get; set; }
        [Required]
        public int ManagerId { get; set; }
    }
}

