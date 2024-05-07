using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class ShiftInfoModel
    {
        public int Id { get; set; }
        public string? ShiftName { get; set; }

        public string? Date { get; set; }

        public string? StartTime { get; set; }

        public string? EndTime { get; set; }

        public bool Checked { get; set; }

        public int? ManagerId { get; set; }
    }
}
