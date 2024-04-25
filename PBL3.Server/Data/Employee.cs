
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        [Required]
        public string? FullName { get; set; }
        [MaxLength(50)]
        [Required]
        public string? Email { get; set; }
        [MaxLength(20)]
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public bool TypeOfEmployee { get; set; }
        [Required]
        public double CoefficientsSalary { get; set; }
        [Required]
        public int DutyId { get; set; }
        [ForeignKey("DutyId")]
        public virtual Duty? Duty { get; set; }
        [Required]
        public bool Status { get; set; }
    }
}
