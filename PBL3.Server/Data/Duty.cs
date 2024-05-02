﻿
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Duty")]
    public class Duty
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string? DutyName { get; set; }
        public double BasicSalary { get; set; }
        //public ICollection<Employee>? Employees { get; set; }
    }
}
