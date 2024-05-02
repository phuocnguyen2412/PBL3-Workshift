using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class AccountModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public int EmployeeId { get; set; }
    }
}
