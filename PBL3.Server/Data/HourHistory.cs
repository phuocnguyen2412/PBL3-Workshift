using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("HourHistory")]
    public class HourHistory
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        public string? HoursPerDay { get; set; }
        public DateTime DateAt { get; set; }
    }
}
