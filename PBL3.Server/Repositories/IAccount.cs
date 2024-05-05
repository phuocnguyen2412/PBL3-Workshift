using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public interface IAccount
    {
        Task AddAccountAsync(AccountModel account);
        Task<object> GetAccountByUserNameAndPassword(AccountModel model);
        Task<bool> ChangePassword(int Id, string password, string newPassword);
        string HashPassword(string password);
    }
}
