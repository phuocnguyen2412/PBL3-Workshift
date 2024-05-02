using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class DutyModel
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string? DutyName { get; set; }

        public double BasicSalary { get; set; }
    }
}
