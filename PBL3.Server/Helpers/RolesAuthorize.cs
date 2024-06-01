using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PBL3.Server.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class RolesAuthorize : AuthorizeAttribute, IAsyncAuthorizationFilter
    {
        public RoleEnum[] RequiredRoles { get; set; }

        public RolesAuthorize(params RoleEnum[] roles)
        {
            RequiredRoles = roles ?? Array.Empty<RoleEnum>();
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var userRole = context.HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userRole) || !RequiredRoles.Select(r => r.ToString()).Contains(userRole))
            {
                context.Result = new ForbidResult("You do not have access to this resource!");
                return;
            }

            await Task.CompletedTask;
        }
    }

    public enum RoleEnum
    {
        Admin,
        Employee,
        Manager
    }
}
