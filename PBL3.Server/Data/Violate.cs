﻿
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Violate")]
    public class Violate
    {
        [Key]
        public int ViolateId { get; set; }

 
        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual ICollection<Employee>? Employee { get; set; }


        public int ShiftInfoId { get; set; }
        [ForeignKey("ShiftInfoId")]
        public virtual ShiftInfo? ShiftInfo { get; set; }

      
        public string? Handle { get; set; }

      
        public bool Checked { get; set; }
    }
}

