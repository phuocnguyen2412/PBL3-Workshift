using PBL3.Server.Data;
using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public interface IAccount
    {
        Task AddAccountAsync(AccountModel account);
        Task<AccountModel> GetAccountByUserNameAndPassword(string userName, string password);
        string HashPassword(string password);
    }
}