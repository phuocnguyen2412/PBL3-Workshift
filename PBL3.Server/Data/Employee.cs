
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
<<<<<<< HEAD
        public int Id { get; set; }

        [MaxLength(50)]
    
=======
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MaxLength(50)]
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public string? FullName { get; set; }
        [MaxLength(50)]
<<<<<<< HEAD
  
=======
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public string? Email { get; set; }
        [MaxLength(20)]
<<<<<<< HEAD

        public string? PhoneNumber { get; set; }


        public bool TypeOfEmployee { get; set; }

        public double CoefficientsSalary { get; set; }

 
        public int DutyId { get; set; }
        [ForeignKey("DutyId")]
        public virtual Duty? Duty { get; set; }

   
=======
        public string? PhoneNumber { get; set; }
        public bool TypeOfEmployee { get; set; }
        public double CoefficientsSalary { get; set; }
        public int DutyId { get; set; }
        [ForeignKey("DutyId")]
        public virtual Duty? Duty { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public bool Status { get; set; }
    }
}
