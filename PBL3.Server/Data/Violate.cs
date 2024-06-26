﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PBL3.Server.Data
{
    [Table("Violate")]
    public class Violate
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public virtual Employee? Employee { get; set; }
        public int ShiftInfoId { get; set; }

        [ForeignKey("ShiftInfoId")]
        public virtual ShiftInfo? ShiftInfo { get; set; }
        public string? Reason { get; set; }
        public int Handle { get; set; }
        public bool Checked { get; set; }
    }
}
