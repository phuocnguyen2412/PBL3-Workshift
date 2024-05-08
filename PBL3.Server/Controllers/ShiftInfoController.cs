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
        public async Task<ActionResult<List<ShiftInfoModel>>> GetAllShiftInfoAsync()
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShiftInfoModel>> GetShiftInfoByIdAsync(int id)
        {
            try
            {
                var shiftInfo = await _shiftInfoRepo.GetShiftInfoByIdAsync(id);
                if (shiftInfo == null)
                {
                    return NotFound(new { message = $"Shift information with ID {id} not found." });
                }
                return Ok(shiftInfo);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddShiftInfoAsync(ShiftInfoModel shiftInfo)
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateShiftInfoAsync(ShiftInfoModel shiftInfo)
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }


        [HttpPut("{id}/{isChecked}")]
        public async Task<ActionResult<ShiftInfoModel>> UpdateShiftInfoCheckedAsync(int id, bool isChecked)
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ShiftInfoModel>> DeleteShiftInfoAsync(int id)
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpGet("shifts-and-employees-by-date/{date}")]
        public async Task<ActionResult<object>> GetShiftsAndEmployeesByDateAsync(DateTime date)
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }
    }
}