
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Violate")]
    public class Violate
    {
        [Key]
<<<<<<< HEAD
        public int ViolateId { get; set; }

 
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual ICollection<Employee>? Employee { get; set; }


        public int ShiftInfoId { get; set; }
        [ForeignKey("ShiftInfoId")]
        public virtual ShiftInfo? ShiftInfo { get; set; }

      
        public string? Handle { get; set; }

      
=======
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        public int ShiftInfoId { get; set; }
        [ForeignKey("ShiftInfoId")]
        public virtual ShiftInfo? ShiftInfo { get; set; }
        public string? Handle { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public bool Checked { get; set; }
    }
}

