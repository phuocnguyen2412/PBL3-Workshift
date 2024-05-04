using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class ShiftInfoModel
    {
        public int Id { get; set; }
        public string? ShiftName { get; set; }

        public DateOnly Date { get; set; }

        public TimeOnly StartTime { get; set; }

        public TimeOnly EndTime { get; set; }

        public bool Checked { get; set; }

        public int ManagerId { get; set; }
    }
}
