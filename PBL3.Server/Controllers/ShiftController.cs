using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using PBL3.Server.Repositories;
using System.Threading.Tasks;

namespace PBL3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        private readonly IShift _shiftRepo;

        public ShiftController(IShift shiftRepo)
        {
            _shiftRepo = shiftRepo;
        }

        [HttpGet]
        public async Task<ActionResult<object>> GetAllShiftAsync()
        {
            try
            {
                var shifts = await _shiftRepo.GetAllShiftAsync();
                if (shifts == null)
                {
                    return NotFound(new { message = "No shift found." });
                }
                return Ok(shifts);
            }
            catch (System.Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetShiftByIdAsync(int id)
        {
            try
            {
                var shift = await _shiftRepo.GetShiftByIdAsync(id);
                if (shift == null)
                {
                    return NotFound(new { message = $"Shift with ID {id} not found." });
                }
                return Ok(shift);
            }
            catch (System.Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ShiftModel>> AddShiftAsync(ShiftModel shift)
        {
            try
            {
                if (shift == null)
                {
                    return BadRequest(new { message = "Invalid shift information." });
                }

                var newShift = await _shiftRepo.AddShiftAsync(shift);
                if (newShift == null)
                {
                    return BadRequest(new { message = "Failed to add shift information." });
                }
                return Ok(newShift);
            }catch(Exception e)
            {
                return BadRequest(new {Message = e.Message});
            }

        }

        [HttpPost("manager")]
        public async Task<ActionResult<ShiftModel>> AddShiftForManagerAsync(ShiftModel shift)
        {
            try
            {
                if (shift == null)
                {
                    return BadRequest(new { message = "Invalid shift information." });
                }

                var newShift = await _shiftRepo.AddShiftForManagerAsync(shift);
                if (newShift == null)
                {
                    return BadRequest(new { message = "Failed to add shift information." });
                }
                return Ok(newShift);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ShiftModel>> UpdateShiftAsync(int id, ShiftModel shift)
        {
            try
            {
                if (shift == null || id != shift.Id)
                {
                    return BadRequest(new { message = "Invalid shift information." });
                }

                var updatedShift = await _shiftRepo.UpdateShiftAsync(shift);
                if (updatedShift == null)
                {
                    return NotFound(new { message = $"Shift with ID {id} not found." });
                }

                return Ok(updatedShift);
            }
            catch(Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPut("{id}/checkin")]
        public async Task<ActionResult<ShiftModel>> UpdateShiftCheckInAsync(int id, TimeSpan checkInTime)
        {
            try
            {
                var updatedShift = await _shiftRepo.UpdateShiftCheckInTimeAsync(id, checkInTime);
                if (updatedShift == null)
                {
                    return NotFound(new { message = $"Shift with ID {id} not found." });
                }
                return Ok(updatedShift);
            }
            catch (System.Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        [HttpPut("{id}/checkout")]
        public async Task<ActionResult<ShiftModel>> UpdateShiftCheckOutAsync(int id, int shiftInfoId, TimeSpan checkOutTime)
        {
            try
            {
                var updatedShift = await _shiftRepo.UpdateShiftCheckOutTimeAsync(id, shiftInfoId, checkOutTime);
                if (updatedShift == null)
                {
                    return NotFound(new { message = $"Shift with ID {id} not found." });
                }
                return Ok(updatedShift);
            }
            catch (System.Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<ShiftModel>> DeleteShiftAsync(int id)
        {
            try
            {
                var deletedShift = await _shiftRepo.DeleteShiftAsync(id);
                if (deletedShift == null)
                {
                    return NotFound(new { message = $"Shift with ID {id} not found." });
                }

                return Ok(deletedShift);
            }
            catch(Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpDelete("{id}/manager")]
        public async Task<ActionResult<bool>> DeleteShiftByManagerAsync(int id, int shiftInfoId)
        {
            try
            {
                var isDeleted = await _shiftRepo.DeleteShiftByManagerAsync(id, shiftInfoId);
                if (!isDeleted)
                {
                    return NotFound(new { message = $"Shift with ID {id} not found." });
                }

                return Ok(isDeleted);
            }
            catch(Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}
