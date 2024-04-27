
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Violate")]
    public class Violate
    {
        [Key]
        public int ViolateId { get; set; }

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

