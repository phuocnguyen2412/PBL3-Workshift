using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.AccessControl;

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

        public async Task<object> GetAccountByUserNameAndPassword(string username, string password)
        {
            var hashedPassword = HashPassword(password);

            var result = from account in _context.Accounts
                            join employee in _context.Employees on account.EmployeeId equals employee.Id
                            join duty in _context.Duties on employee.DutyId equals duty.Id
                            where account.UserName == employee.Email && account.Password == hashedPassword
                            select new
                            {
                                EmployeeId = employee.Id,
                                dutyName = duty.DutyName,
                                FullName = employee.FullName
                            };



            return result.FirstOrDefault(); ;
        }


        public string HashPassword(string password)
        {
            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }
}