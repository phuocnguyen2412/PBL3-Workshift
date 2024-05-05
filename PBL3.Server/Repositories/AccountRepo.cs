using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;

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
        public async Task AddAccountAsync(AccountModel accountModel)
        {
            var account = _mapper.Map<Account>(accountModel);
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
        }

        public async Task<object> GetAccountByUserNameAndPassword(AccountModel model)
        {
            var hashedPassword = HashPassword(model.Password);
            var result = from account in _context.Accounts
                         join employee in _context.Employees on account.EmployeeId equals employee.Id
                         join duty in _context.Duties on employee.DutyId equals duty.Id
                         where account.UserName == model.UserName && account.Password == hashedPassword
                         select new
                         {
                            fullName = employee.FullName,
                             EmployeeId = employee.Id,
                             dutyName = duty.DutyName
                         };
            return await result.FirstOrDefaultAsync();
        }

        public async Task<bool> ChangePassword(int Id, string password, string newPassword)
        {
            var hashedPassword = HashPassword(password);
            var account = await _context.Accounts.FirstOrDefaultAsync(acc => acc.EmployeeId == Id && acc.Password == hashedPassword);
            if (account != null)
            {
                var newHashedPassword = HashPassword(newPassword);
                account.Password = newHashedPassword;
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public string HashPassword(string password)
        {
            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

    }
}