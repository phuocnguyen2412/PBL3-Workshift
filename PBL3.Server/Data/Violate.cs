
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    [Table("Violate")]
    public class Violate
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        [Required]
        public int ShiftInfoId { get; set; }
        [ForeignKey("ShiftInfoId")]
        public virtual ShiftInfo? ShiftInfo { get; set; }
        [Required]
        public string? Handle { get; set; }
        [Required]
        public bool Checked { get; set; }
    }
}

