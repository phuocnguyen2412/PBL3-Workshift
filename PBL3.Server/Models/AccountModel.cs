using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class AccountModel
    {
<<<<<<< HEAD
        public string? UserName { get; set; }
        public string? Password { get; set; }
=======

        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int EmployeeId { get; set; }
        public string? DutyName { get; set; }
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
    }
}
