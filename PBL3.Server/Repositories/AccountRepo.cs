using PBL3.Server.Data;
using PBL3.Server.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace PBL3.Server.Repositories
{
    public class AccountRepo : IAccount
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public AccountRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddAcountAsync(AccountModel model)
        {
            var newAccount = _mapper.Map<Account>(model);
            _context.Accounts!.Add(newAccount);
            await _context.SaveChangesAsync();

            return newAccount.Id;
        }

        public async Task DeleteAcountAsync(int id)
        {
            var deleteAccount = _context.Accounts!.SingleOrDefault(b => b.Id == id);
            if(deleteAccount != null)
            {
                _context.Accounts!.Remove(deleteAccount);
                await _context.SaveChangesAsync() ;
            }
        }

        public async Task<List<AccountModel>> GetAccountAsync(int id)
        {
            var account = await _context.Accounts!.FindAsync(id);
            return _mapper.Map<List<AccountModel>>(account);
        }

        public async Task<List<AccountModel>> GetAllAccountsAsync()
        {
            var accounts = await _context.Accounts!.ToListAsync();
            return _mapper.Map<List<AccountModel>>(accounts);
        }

        public async Task UpdateAcountAsync(int id, AccountModel model)
        {
            if (id == model.Id)
            {
                var updateAccount = _mapper.Map<Account>(model);
                _context.Accounts!.Update(updateAccount);
                await _context.SaveChangesAsync();
            }
        }
    }
}
