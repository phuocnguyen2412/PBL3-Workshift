using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        public async Task<ActionResult<List<BonusSalaryHistory>>> GetAllBonusSalary()
        {
            var bonusSalaries = await _bonusSalaryRepo.GetAllBonusSalaryAsync();
            return bonusSalaries;
        }

        [HttpPost("addforemployees")]
        public async Task<ActionResult<int>> AddBonusSalaryForEmployees( BonusSalaryRequest request)
        {
            var id = await _bonusSalaryRepo.AddBonusSalaryForEmployeesAsync(request);
            if (id > 0)
            {
                return Ok(new { Message = "Bonus salary added successfully", BonusSalaryId = id });
            }
            else
            {
                return BadRequest(new { Message = "Failed to add bonus salary" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBonusSalary(int id)
        {
            var deleted = await _bonusSalaryRepo.DeleteBonusSalaryAsync(id);
            if (deleted)
            {
                return Ok(new { Message = "Bonus salary deleted successfully" });
            }
            else
            {
                return NotFound(new { Message = "Bonus salary not found" });
            }
        }
    }
}
