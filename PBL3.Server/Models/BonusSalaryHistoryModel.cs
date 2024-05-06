using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class BonusSalaryHistoryModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }
        public int? TotalBonus { get; set; }
        public string? Reason { get; set; }
    }
}
