using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class AccountModel
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        [Required]
        public string? UserName { get; set; }
        [MaxLength(50)]
        [Required]
        public string? Password { get; set; }
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
