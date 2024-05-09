using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using Microsoft.AspNetCore.Mvc;

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
        public async Task AddAccountAsync(string email, int employeeId)
        {
            if (email == null)
            {
                throw new ArgumentNullException(nameof(email), "Email cannot be null.");
            }

            var hashedPassword = HashPassword(email);
            string token = GenerateToken();

            var account = new Account
            {
                UserName = email,
                Password = hashedPassword,
                EmployeeId = employeeId,
                Token = token
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
        }

        public async Task<object> GetAccountByUserNameAndPassword(AccountModel model)
        {
            var hashedPassword = HashPassword(model.Password);
            var result = from account in _context.Accounts
                         join employee in _context.Employees on account.EmployeeId equals employee.Id
                         join duty in _context.Duties on employee.DutyId equals duty.Id
                         where account.UserName == model.UserName && account.Password == hashedPassword && employee.Status == true
                         select new
                         {
                             fullName = employee.FullName,
                             EmployeeId = employee.Id,
                             dutyName = duty.DutyName
                         };
            return await result.FirstOrDefaultAsync();
        }

        public async Task<object> GetAccountByToken(string token)
        {
            var account = await (from a in _context.Accounts
                                 join employee in _context.Employees on a.EmployeeId equals employee.Id
                                 join duty in _context.Duties on employee.DutyId equals duty.Id
                                 where a.Token == token
                                 select new
                                 {
                                     FullName = employee.FullName,
                                     EmployeeId = employee.Id,
                                     DutyName = duty.DutyName,
                                     Token = a.Token, 
                                     AccountId = a.Id
                                 }).FirstOrDefaultAsync();

            if (account != null)
            {
                string newToken = GenerateToken();
                var accountToUpdate = await _context.Accounts.FindAsync(account.AccountId);
                accountToUpdate.Token = newToken;
                await _context.SaveChangesAsync();

                var updatedAccount = new
                {
                    account.FullName,
                    account.EmployeeId,
                    account.DutyName,
                    account.AccountId,
                    Token = newToken
                };

                return updatedAccount;
                
            }

            return account;
        }
        private string GenerateToken()
        {
            return Guid.NewGuid().ToString(); 
        }

        public async Task<bool> ChangePassword(ChangePasswordModel model)
        {
            var hashedPassword = HashPassword(model.Password);
            var account = await _context.Accounts.FirstOrDefaultAsync(acc => acc.EmployeeId == model.Id && acc.Password == hashedPassword);
            if (account != null)
            {
                var newHashedPassword = HashPassword(model.newPassword);
                account.Password = newHashedPassword;
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        private string HashPassword(string password)
        {
            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

    }
}