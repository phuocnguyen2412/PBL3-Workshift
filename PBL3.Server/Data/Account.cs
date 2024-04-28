using PBL3.Server.Repositories;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Account")]
    public class Account
    {
        [Key]
        public int AccountId { get; set; }

        [MaxLength(50)]
     
        public string? UserName { get; set; }

        [MaxLength(50)]
   
        public string? Password { get; set; }
       
      
        public int DutyId { get; set; }
        [ForeignKey("DutyId")]
        public virtual ICollection<Duty>? Duty { get; set; }

     
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual ICollection<Employee>? Employee { get; set; }
    }
}
