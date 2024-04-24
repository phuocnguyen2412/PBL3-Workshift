using PBL3.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Models
{
    [Table("Account")]
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        [Required]
        public string? UserName { get; set; }
        [MaxLength(50)]
        [Required]
        public string? Password { get; set; }
        [MaxLength(50)]
        [Required]
        public int DutyId { get; set; }
        [ForeignKey("DutyId")]
        public virtual Duty? Duty { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
    }
}
