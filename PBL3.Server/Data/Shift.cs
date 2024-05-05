
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Shift")]
    public class Shift
    {
        [Key]
<<<<<<< HEAD
        public int ShiftId { get; set; }
        
 
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual ICollection<Employee>? Employee { get; set; }

   
        public DateTime CheckInTime { get; set; }

   
=======
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        public DateTime CheckInTime { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public DateTime CheckOutTime { get; set; }
    }
}

