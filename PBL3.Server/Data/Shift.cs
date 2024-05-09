
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Shift")]
    public class Shift
    {
        [Key]
        public int Id { get; set; }
        public int ShiftInfoId { get; set; }
        [ForeignKey("EmployeeId")]
        public ShiftInfo ShiftInfo { get; set; }
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        public TimeSpan CheckInTime { get; set; }
        public TimeSpan CheckOutTime { get; set; }
    }
}

