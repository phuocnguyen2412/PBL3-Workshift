using PBL3.Server.Data;
using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public interface IAccount
    {
        Task AddAccountAsync(AccountModel account);
        Task<object> GetAccountByUserNameAndPassword(AccountModel model);
        string HashPassword(string password);
        Task<bool> ChangePassword(int Id, string password, string newPassword);
    }
}