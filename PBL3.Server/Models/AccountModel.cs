﻿using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class AccountModel
    {

        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int EmployeeId { get; set; }
        public string? DutyName { get; set; }
    }
}
