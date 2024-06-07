using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Helpers;
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
        public async Task<object> GetAllBonusSalaryAsync()
        {
            var bonusSalaries = await _bonusSalaryRepo.GetAllBonusSalaryAsync();
            return bonusSalaries;
        }
       
        [HttpPost("addforemployees")]
        public async Task<ActionResult<int>> AddBonusSalaryForEmployees( BonusSalaryModel model)
        {
           
            var id = await _bonusSalaryRepo.AddBonusSalaryForEmployeesAsync(model);
            if (id > 0)
            {
                return Ok(new { Message = "Bonus salary added successfully" });
            }
            else
            {
                return BadRequest(new { Message = "Failed to add bonus salary" });
            }
        }
   
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBonusSalary(int id)
        {
            var delete = await _bonusSalaryRepo.DeleteBonusSalaryAsync(id);
            if (delete)
            {
                return Ok(new { Message = "Bonus salary deleted successfully" });
            }
            else
            {
                return NotFound(new { Message = "Bonus salary not found" });
            }
        }
       
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetBonusSalaryById(int id)
        {
            var bonusSalary = await _bonusSalaryRepo.GetBonusSalaryByIdAsync(id);
            if (bonusSalary == null)
            {
                return NotFound(new { Message = "Bonus salary not found" });
            }
            return bonusSalary;
        }

        [HttpGet("bydate")]
        public async Task<ActionResult<object>> GetAllBonusSalaryByDate(DateTime date)
        {
            var bonusSalaries = await _bonusSalaryRepo.GetAllBonusSalaryByDateAsync(date);
            if (bonusSalaries == null)
            {
                return NotFound(new { Message = "No bonus salary found" });
            }
            return bonusSalaries;
        }
    }
}
