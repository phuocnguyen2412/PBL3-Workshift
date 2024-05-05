<<<<<<< HEAD
﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
=======
﻿using Microsoft.AspNetCore.Mvc;
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
using PBL3.Server.Models;
using PBL3.Server.Repositories;
using System.Threading.Tasks;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccount _accountRepo;

        public AccountController(IAccount accountRepo)
        {
            _accountRepo = accountRepo;
        }

<<<<<<< HEAD
        [HttpPost("Login")]
        public async Task<ActionResult<AccountModel>> Login(AccountModel model)
        {
            if (string.IsNullOrEmpty(model.UserName)) 
            {
                return BadRequest("Username cannot be empty!");
            }
            if (string.IsNullOrEmpty(model.Password)) 
            {
                return BadRequest("Password cannot be empty!");
            }

            var account = await _accountRepo.GetAccountByUserNameAndPassword(model);

            if (account == null)
            {
                return NotFound("UserName or Password is incorrect, please try again!");
            }

            return Ok(account);
        }

        [HttpPost("ChangePassword")]
        public async Task<ActionResult<bool>> ChangePassword(int Id, string password, string newPassword)
        {
            if (string.IsNullOrEmpty(password))
            {
                return BadRequest("Password cannot be empty!");
            }
            if (string.IsNullOrEmpty(newPassword))
            {
                return BadRequest("New Password cannot be empty!");
            }
            var success = await _accountRepo.ChangePassword(Id, password, newPassword);

            if (success)
            {
                return Ok("Change password successfully!");
            }
            else
            {
                return NotFound("Employee not found or old password is incorrect!");
            }
=======
       
        [HttpPost("Login")]
        public async Task<ActionResult<AccountModel>> Login(AccountModel loginModel)
        {
            if (loginModel.UserName == null) 
            {
                return BadRequest("Username cannot be null!");
            }
            if (loginModel.Password == null) 
            {
                return BadRequest("Password cannot be null!");
            }

            var account = await _accountRepo.GetAccountByUserNameAndPassword(loginModel.UserName, loginModel.Password);

            if (account == null)
            {
                return NotFound("Tai khoan hoac mat khau khong dung!");
            }

            return Ok(account);
>>>>>>> 45ecc88b756384382666babbfc339c40779dc94e
        }
    }
}
