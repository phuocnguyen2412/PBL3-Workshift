using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class ShiftInfoModel
    {
        public int Id { get; set; }
        public string? ShiftName { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public bool Checked { get; set; }

        public int ManagerId { get; set; }
    }
}
