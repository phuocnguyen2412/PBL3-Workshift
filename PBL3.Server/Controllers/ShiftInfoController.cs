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
                return await _shiftInfoRepo.GetAllShiftInfoAsync();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
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
                    return NotFound();
                }

                return shiftInfo;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddShiftInfoAsync(ShiftInfoModel shiftInfo)
        {
            try
            {
                var newShiftInfo = await _shiftInfoRepo.AddShiftInfoAsync(shiftInfo);
                return newShiftInfo.Id;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ShiftInfoModel>> UpdateShiftInfoAsync(ShiftInfoModel shiftInfo)
        {
            try
            {
                var updatedShiftInfo = await _shiftInfoRepo.UpdateShiftInfoAsync(shiftInfo);
                if (updatedShiftInfo == null)
                {
                    return NotFound();
                }

                return updatedShiftInfo;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteShiftInfoAsync(int id)
        {
            try
            {
                var result = await _shiftInfoRepo.DeleteShiftInfoAsync(id);
                if (!result)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
