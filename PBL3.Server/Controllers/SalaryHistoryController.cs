using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using PBL3.Server.Helpers;
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

        [RolesAuthorize("Admin")]
        [HttpGet]
        public async Task<object> GetAll()
        {
            var salaryHistories = await _salaryHistoryRepo.GetAllSalaryHistory();
            return Ok(salaryHistories);
        }

        // [HttpGet("Id")]
        // public async Task<object> GetAllById(int Id)
        // {
        //     var salaryHistories = await _salaryHistoryRepo.GetAllSalaryHistoryById(Id);
        //     return Ok(salaryHistories);
        // }

        [RolesAuthorize("Admin", "Employee", "Manager")]
        [HttpGet("EmployeeId")]
        public async Task<object> GetAllSalaryHistoryByEmployeeId(int EmployeeId)
        {
            var salaryHistories = await _salaryHistoryRepo.GetAllSalaryHistoryByEmployeeId(
                EmployeeId
            );
            return Ok(salaryHistories);
        }

        [RolesAuthorize("Admin")]
        [HttpPost]
        public async Task<object> Add(SalaryHistoryModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var addedSalaryHistory = await _salaryHistoryRepo.AddSalaryHistory(model);
                return Ok(addedSalaryHistory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [RolesAuthorize("Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePaidDateById(int id)
        {
            try
            {
                await _salaryHistoryRepo.UpdateSalaryById(id);
                return Ok(new { Message = "Salary history updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
