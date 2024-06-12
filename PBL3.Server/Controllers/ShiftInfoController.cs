using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using PBL3.Server.Repositories;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShiftInfoController : ControllerBase
    {
        private readonly IShiftInfo _shiftInfoRepo;

        public ShiftInfoController(IShiftInfo shiftInfoRepo)
        {
            _shiftInfoRepo = shiftInfoRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<ShiftInfoModel>>> GetAll()
        {
            try
            {
                var shiftInfos = await _shiftInfoRepo.GetAllShiftInfoAsync();
                if (shiftInfos == null)
                {
                    return NotFound(new { message = "No shift information found." });
                }
                return Ok(shiftInfos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }
        [HttpGet("GetAllEmployeeInShiftInfo")]
        public async Task<ActionResult<List<ShiftInfoModel>>> GetAllEmployeeInShiftInfo(int shiftInfo)
        {
            try
            {
                var shiftInfos = await _shiftInfoRepo.GetEmployeeInShiftInfoAsync(shiftInfo);
                if (shiftInfos == null)
                {
                    return NotFound(new { message = "No shift information found." });
                }
                return Ok(shiftInfos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }


        [HttpPost]
        public async Task<ActionResult> Add(ShiftInfoModel shiftInfo)
        {
            if (shiftInfo == null)
            {
                return BadRequest(new { message = "Shift information is null." });
            }

            try
            {
                var newShiftInfo = await _shiftInfoRepo.AddShiftInfoAsync(shiftInfo);
                if (newShiftInfo == null)
                {
                    return BadRequest(new { message = "Failed to add shift information." });
                }
                return Ok(newShiftInfo);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, new { message = e.Message });
            }
        }

        [HttpPut]
        public async Task<ActionResult> Update(ShiftInfoModel shiftInfo)
        {
            if (shiftInfo == null)
            {
                return BadRequest(new { message = "Shift information is null." });
            }

            try
            {
                var updatedShiftInfo = await _shiftInfoRepo.UpdateShiftInfoAsync(shiftInfo);
                if (updatedShiftInfo == null)
                {
                    return NotFound(new { message = $"Shift information with ID {shiftInfo.Id} not found." });
                }
                return Ok(updatedShiftInfo);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        [HttpPut("{id}/{isChecked}")]
        public async Task<ActionResult<ShiftInfoModel>> UpdateChecked(int id, bool isChecked)
        {
            try
            {
                var updatedShiftInfo = await _shiftInfoRepo.UpdateShiftInfoCheckedAsync(id, isChecked);
                if (updatedShiftInfo == null)
                {
                    return NotFound(new { message = $"Shift information with ID {id} not found." });
                }
                return Ok(updatedShiftInfo);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ShiftInfoModel>> Delete(int id)
        {
            try
            {
                var deleted = await _shiftInfoRepo.DeleteShiftInfoAsync(id);
                if (deleted == null)
                {
                    return NotFound(new { message = $"Shift information with ID {id} not found." });
                }
                return Ok(deleted);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }

        [HttpGet("shifts-and-employees-by-date/{date}")]
        public async Task<ActionResult<object>> GetByDate(DateTime date)
        {
            try
            {
                var shiftsAndEmployees = await _shiftInfoRepo.GetShiftsAndEmployeesByDateAsync(date);
                if (shiftsAndEmployees == null)
                {
                    return NotFound(new { message = "No shift information found." });
                }
                return Ok(shiftsAndEmployees);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }

        [HttpGet("workdates/{employeeId}")]
        public async Task<ActionResult<List<ShiftInfoModel>>> GetWorkDates(int employeeId)
        {
            try
            {
                var workDates = await _shiftInfoRepo.GetWorkDatesForEmployeeAsync(employeeId);
                if (workDates == null || workDates.Count == 0)
                {
                    workDates = new List<ShiftInfoModel>();
                }
                return Ok(workDates);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }

        [HttpGet("manager/{managerId}")]
        public async Task<ActionResult<List<ShiftInfoModel>>> GetShiftsForManager(int managerId)
        {
            try
            {
                var shifts = await _shiftInfoRepo.GetShiftsForManagerAsync(managerId);
                if (shifts == null || shifts.Count == 0)
                {
                    return NotFound(new { message = $"No shifts found for manager ID {managerId}." });
                }
                return Ok(shifts);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
            }
        }
    }
}