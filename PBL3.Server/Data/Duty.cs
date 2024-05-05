
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PBL3.Server.Data
{
    [Table("Duty")]
    public class Duty
    {
        [Key]
        public int Id { get; set; }
<<<<<<< HEAD

       
        [StringLength(50)]
        public string? DutyName { get; set; }

 
=======
        [StringLength(50)]
        public string? DutyName { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        public double BasicSalary { get; set; }
     
    }
}
