﻿using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class ShiftModel
    {
        public int Id { get; set; }
        public int ShiftInfoId { get; set; }
        public int EmployeeId { get; set; } 
        public DateTime CheckInTime { get; set; }
        public DateTime CheckOutTime { get; set; }
    }
}
