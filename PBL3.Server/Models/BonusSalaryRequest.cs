﻿namespace PBL3.Server.Models
{
    public class BonusSalaryRequest
    {
        public List<int> EmployeeIds { get; set; }
        public DateTime DateTime {  get; set; }
        public int TotalBonus { get; set; }
        public string Reason { get; set; }
    }
}