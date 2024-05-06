using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                if (shiftInfos == null || !shiftInfos.Any())
                {
                    return NotFound("No shift information found.");
                }
                return shiftInfos;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error: {e.Message}");
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
                    return NotFound($"Shift information with ID {id} not found.");
                }
                return shiftInfo;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error: {e.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddShiftInfoAsync(ShiftInfoModel shiftInfo)
        {
            if (shiftInfo == null)
            {
                return BadRequest("Shift information is null.");
            }

            try
            {
                var newShiftInfo = await _shiftInfoRepo.AddShiftInfoAsync(shiftInfo);
                if (newShiftInfo == null)
                {
                    return BadRequest("Failed to add shift information.");
                }
                return Ok("Shift information added successfully.");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error: {e.Message}");
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateShiftInfoAsync(ShiftInfoModel shiftInfo)
        {
            if (shiftInfo == null)
            {
                return BadRequest("Shift information is null.");
            }

            try
            {
                var updatedShiftInfo = await _shiftInfoRepo.UpdateShiftInfoAsync(shiftInfo);
                if (updatedShiftInfo == null)
                {
                    return NotFound("Failed to update shift information.");
                }
                return Ok($"Shift information updated successfully.");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error: {e.Message}");
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<ShiftInfoModel>> DeleteShiftInfoAsync(int id)
        {
            try
            {
                var deleted = await _shiftInfoRepo.DeleteShiftInfoAsync(id);
                if (!deleted)
                {
                    return NotFound($"Shift information with ID {id} not found.");
                }
                return Ok($"Shift information with ID {id} deleted.");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error: {e.Message}");
            }
        }
    }
}
