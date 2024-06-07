using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PBL3.Server.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class RolesAuthorize : ActionFilterAttribute, IAsyncAuthorizationFilter
    {
        private readonly string[] _requiredRoles;
        public RolesAuthorize(params string[] roles)
        {
            _requiredRoles = roles;
        }


        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {

            var token = context.HttpContext.Request.Headers["Authorization"].ToString();
            await Console.Out.WriteLineAsync(token);
            if (string.IsNullOrEmpty(token) || !await IsAuthorized(context.HttpContext, token))
            {
                throw new Exception();
            }

            await Task.CompletedTask;
        }


        private async Task<bool> IsAuthorized(HttpContext httpContext, string token)
        {
            if (httpContext.RequestServices.GetService(typeof(MyDbContext)) is not MyDbContext dbContext) return false;
            var result = await (
                from account in dbContext.Accounts
                where account.Token == token && _requiredRoles.Contains(account.Employee.Duty.DutyName)
                select account
            ).FirstOrDefaultAsync();

            return result != null;
        }
    }
}
