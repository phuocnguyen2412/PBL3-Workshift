using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Modals
{
    [Table("Duty")]
    public class Duty
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string DutyName { get; set; }
        [Required]
        public double BasicSalary { get; set; }
        public ICollection<Employee> Employees { get; set; }
        public Duty()
        {
            Employees = new HashSet<Employee>();
        }
    }
}
