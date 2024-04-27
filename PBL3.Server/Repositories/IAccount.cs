using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public interface IAccount
    {
        public Task<List<AccountModel>> GetAllAccountsAsync();
        public Task<AccountModel> GetAccountAsync(int id);
        public Task<int> AddAcountAsync(AccountModel model);
        public Task UpdateAcountAsync(int id, AccountModel model);
        public Task DeleteAcountAsync(int id);
    }
}
