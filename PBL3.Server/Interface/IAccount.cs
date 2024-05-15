using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Models;

namespace PBL3.Server.Interface
{
    public interface IAccount
    {
        Task<object> GetAccountByUserNameAndPassword(AccountModel model);
        Task<object> GetAccountByToken(TokenModel token);
        Task AddAccountAsync(string email, int employeeId);
        Task<bool> ChangePassword(ChangePasswordModel model);
        Task<object> Author(string token, List<string> listDuty);
    }
}
