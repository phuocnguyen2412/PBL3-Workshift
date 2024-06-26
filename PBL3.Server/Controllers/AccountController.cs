﻿using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Helpers;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using System.Threading.Tasks;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        private readonly IAccount _accountRepo;
        private readonly MyDbContext _context;

        public AccountController(IAccount accountRepo, MyDbContext context)
        {
            _accountRepo = accountRepo;
            _context = context;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AccountModel>> Login(AccountModel model)
        {
            if (string.IsNullOrEmpty(model.UserName))
            {
                return BadRequest(new { Message = "Username cannot be empty!" });
            }

            if (string.IsNullOrEmpty(model.Password))
            {
                return BadRequest(new { Message = "Password cannot be empty!" });
            }

            var account = await _accountRepo.GetAccountByUserNameAndPassword(model);

            if (account == null)
            {
                return NotFound(new { Message = "Username or Password is incorrect, please try again!" });
            }
            return Ok(account);
        }
        
        [RolesAuthorize("Admin", "Employee", "Manager")]
        [HttpPost("LoginByToken")]
        public async Task<ActionResult<object>> LoginByToken(TokenModel token)
        {
            if (string.IsNullOrEmpty(token.Token))
            {
                return BadRequest("Token cannot be empty!");
            }

            var account = await _accountRepo.GetAccountByToken(token);

            if (account == null)
            {
                return NotFound(new { Message = "Token is invalid!" });
            }

            return Ok(account);
        }

        [RolesAuthorize("Admin", "Employee", "Manager")]
        [HttpPost("ChangePassword")]
        public async Task<ActionResult<bool>> ChangePassword(ChangePasswordModel model)
        {
            if (string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Password cannot be empty!");
            }
            if (string.IsNullOrEmpty(model.newPassword))
            {
                return BadRequest("New Password cannot be empty!");
            }
            var success = await _accountRepo.ChangePassword(model);

            if (success)
            {
                return Ok(new { Message = "Change password successfully!" });
            }
            else
            {
                return NotFound(new { Message = "Employee not found or old password is incorrect!" });
            }
        }
    }
}
