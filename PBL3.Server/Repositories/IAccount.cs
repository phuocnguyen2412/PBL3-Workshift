using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public interface IAccount
    {
        Task<AccountModel> GetAccountByUserNameAndPassword(string userName, string password);

    }
}
