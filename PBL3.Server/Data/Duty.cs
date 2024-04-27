
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Duty")]
    public class Duty
    {
        [Key]
        public int DutyId { get; set; }

        [Required]
        [StringLength(50)]
        public string? DutyName { get; set; }

        [Required]
        public double BasicSalary { get; set; }
    }
}
