using Microsoft.AspNetCore.Mvc;
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
                return NotFound("Invalid username or password");
            }

            return Ok(account);
        }
    }
}
