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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountById(int id) 
        {
            var account = await _accountRepo.GetAccountAsync(id);
            return account == null ? NotFound() : Ok(account);
        }
        
    }
}
