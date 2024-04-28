
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Shift")]
    public class Shift
    {
        [Key]
        public int ShiftId { get; set; }
        
 
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual ICollection<Employee>? Employee { get; set; }

   
        public DateTime CheckInTime { get; set; }

   
        public DateTime CheckOutTime { get; set; }
    }
}

