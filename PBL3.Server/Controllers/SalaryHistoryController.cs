using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using System.Threading.Tasks;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryHistoryController : ControllerBase
    {
        private readonly ISalaryHistory _salaryHistoryRepo;

        public SalaryHistoryController(ISalaryHistory salaryHistoryRepo)
        {
            _salaryHistoryRepo = salaryHistoryRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSalaryHistory()
        {
            var salaryHistories = await _salaryHistoryRepo.GetAllSalaryHistory();
            return Ok(salaryHistories);
        }

        [HttpGet("{employeeId}")]
        public async Task<object> GetAllSalaryHistoryById(int Id)
        {
            var salaryHistories = await _salaryHistoryRepo.GetAllSalaryHistoryById(Id);
            return Ok(salaryHistories);
        }
        [HttpPost]
        public async Task<object> AddSalaryHistory(SalaryHistoryModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var addedSalaryHistory = await _salaryHistoryRepo.AddSalaryHistory(model);
            return Ok(addedSalaryHistory);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSalaryById(int id)
        {
            await _salaryHistoryRepo.UpdateSalaryById(id);
            return Ok(new { Message = "Salary history updated successfully." });
        }
    }
}
