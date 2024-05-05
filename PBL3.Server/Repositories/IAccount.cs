using PBL3.Server.Data;
using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public interface IAccount
    {
        Task AddAccountAsync(AccountModel account);
<<<<<<< HEAD
        Task<object> GetAccountByUserNameAndPassword(AccountModel model);
        Task<bool> ChangePassword(int Id, string password, string newPassword);
=======
        Task<object> GetAccountByUserNameAndPassword(string userName, string password);
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        string HashPassword(string password);
    }
}