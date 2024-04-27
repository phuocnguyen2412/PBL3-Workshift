
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(50)]
        
        public string? FullName { get; set; }

        [MaxLength(50)]
        
        public string? Email { get; set; }

        [MaxLength(20)]
        
        public string? PhoneNumber { get; set; }

        
        public bool TypeOfEmployee { get; set; }

        
        public double CoefficientsSalary { get; set; }

   
        public int DutyId { get; set; }
        [ForeignKey("DutyId")]
        public virtual Duty? Duty { get; set; }

        
        public bool Status { get; set; }
    }
}
