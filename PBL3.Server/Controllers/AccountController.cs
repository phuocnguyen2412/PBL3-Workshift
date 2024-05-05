using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Repositories;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccount _accountRepo;

        public AccountController(IAccount repo) 
        {
            _accountRepo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAccounts()
        {
            try
            {
                return Ok(await _accountRepo.GetAllAccountsAsync());
            }
            catch 
            {
                return BadRequest();
            }
        }

<<<<<<< Updated upstream
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountById(int id) 
        {
            var account = await _accountRepo.GetAccountAsync(id);
            return account == null ? NotFound() : Ok(account);
        }

=======
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
        }
>>>>>>> Stashed changes
    }
}
