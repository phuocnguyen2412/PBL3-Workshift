using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("ShiftInfo")]
    public class ShiftInfo
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
<<<<<<< HEAD
      
        public string? ShiftName { get; set; }

   
        public DateTime Date { get; set; }


        public TimeSpan StartTime { get; set; }

      
        public TimeSpan EndTime { get; set; }


        public bool Checked { get; set; }


=======
        public string? ShiftName { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }   
        public bool Checked { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public int ManagerId { get; set; }
    }
}

