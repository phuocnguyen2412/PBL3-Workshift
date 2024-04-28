using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("ShiftInfo")]
    public class ShiftInfo
    {
        [Key]
        public int ShiftInfoId { get; set; }

        [MaxLength(50)]
      
        public string? ShiftName { get; set; }

   
        public DateTime Date { get; set; }


        public TimeSpan StartTime { get; set; }

      
        public TimeSpan EndTime { get; set; }


        public bool Checked { get; set; }


        public int ManagerId { get; set; }
    }
}

