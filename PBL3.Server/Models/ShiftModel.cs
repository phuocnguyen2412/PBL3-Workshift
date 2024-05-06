using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class ShiftModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }
        public string? CheckInTime { get; set; }
        public string? CheckOutTime { get; set; }
    }
}
