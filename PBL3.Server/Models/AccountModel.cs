using PBL3.Server.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PBL3.Server.Models
{
    public class AccountModel
    {
<<<<<<< HEAD
        public string UserName { get; set; }
        public string Password { get; set; }
=======
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int DutyId { get; set; }
        public virtual DutyModel? Duty { get; set; }
>>>>>>> 909ddd8535f3d5d43a8d705c68909f8a2724094e
        public int EmployeeId { get; set; }
    }
}
