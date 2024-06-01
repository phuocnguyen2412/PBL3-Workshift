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

            if (string.IsNullOrEmpty(token) || !await IsAuthorized(context.HttpContext, token)) 
            {
                context.Result =  new NotFoundResult();
                return;
            }

            await Task.CompletedTask;
        }

        
        private async Task<bool> IsAuthorized(HttpContext httpContext, string token)
        {
            var dbContext = httpContext.RequestServices.GetService(typeof(MyDbContext)) as MyDbContext; // Service locator pattern
            if (dbContext == null) return false;

            var result = await (
                from account in dbContext.Accounts
                join employee in dbContext.Employees on account.EmployeeId equals employee.Id
                join duty in dbContext.Duties on employee.DutyId equals duty.Id
                where account.Token == token && _requiredRoles.Contains(duty.DutyName)
                select duty.DutyName
            ).FirstOrDefaultAsync();

            return result != null;
        }
    }
}
