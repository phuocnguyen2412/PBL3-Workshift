using PBL3.Server.Repositories;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Account")]
    public class Account
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
<<<<<<< HEAD
     
        public string? UserName { get; set; }

        [MaxLength(50)]
   
        public string? Password { get; set; }
       
      
        public int DutyId { get; set; }
        [ForeignKey("DutyId")]
        public virtual ICollection<Duty>? Duty { get; set; }

     
=======
        public string UserName { get; set; }
        [Required]
        [MaxLength(50)]
        public string Password { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        
    }
}
