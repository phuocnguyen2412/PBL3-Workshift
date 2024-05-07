using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using PBL3.Server.Repositories;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BonusSalaryController : ControllerBase
    {
        private IBonusSalary _bonusSalaryRepo;

        public BonusSalaryController(IBonusSalary bonusSalaryRepo)
        {
            _bonusSalaryRepo = bonusSalaryRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<BonusSalaryModel>>> Get()
        {
            return await _bonusSalaryRepo.GetAllBonusSalaries();
        }

        [HttpPost]
        public async Task<ActionResult<int>>AddBonusSalary(BonusSalaryModel model)
        {
            var id = await _bonusSalaryRepo.AddBonusSalaryAsync(model);
            return CreatedAtAction(nameof(Get), new { id = id }, model);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateBonusSalaryAsync(int Id, )
        {
            await _bonusSalaryRepo.UpdateBonusSalaryAsync(model);
            return NoContent();
        }
    }
}
