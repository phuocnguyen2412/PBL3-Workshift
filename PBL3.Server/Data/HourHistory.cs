
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("HourHistory")]
    public class HourHistory
    {
        [Key]
<<<<<<< HEAD
        public int HourHistoryId { get; set; }

  
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }

        public string? HoursPerDay { get; set; }


=======
        public int Id { get; set; }    
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        public string? HoursPerDay { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public DateTime DateAt { get; set; }
    }
}
