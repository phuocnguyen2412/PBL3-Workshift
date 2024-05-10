using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class ViolateModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int ShiftInfoId { get; set; }
        public string? Reason { get; set; }
        public int Handle { get; set; }
        public bool Checked { get; set; }
    }
}
