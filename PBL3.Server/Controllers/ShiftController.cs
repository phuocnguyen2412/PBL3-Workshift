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
            }
            catch (Exception e)
            {
                return BadRequest(new { e.Message });
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
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPut("{shiftId}/checkin")]
        public async Task<ActionResult<ShiftModel>> UpdateShiftCheckInAsync(int shiftId, int managerId)
        {
            try
            {
                var updatedShift = await _shiftRepo.UpdateShiftCheckInTimeAsync(shiftId, managerId);
                if (updatedShift == null)
                {
                    return NotFound(new { message = $"Shift with ID {shiftId} not found." });
                }
                return Ok(updatedShift);
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPut("{shiftId}/checkout")]
        public async Task<ActionResult<ShiftModel>> UpdateShiftCheckOutAsync(int shiftId, int managerId)
        {
            try
            {
                var updatedShift = await _shiftRepo.UpdateShiftCheckOutTimeAsync(shiftId, managerId);
                if (updatedShift == null)
                {
                    return NotFound(new { message = $"Shift with ID {shiftId} not found." });
                }
                return Ok(new { message = $"Update {shiftId} thanh cong." });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }



        [HttpDelete("delete")]
        public async Task<ActionResult<bool>> DeleteShiftAsync(int shiftId)
        {
            try
            {
                var deletedShift = await _shiftRepo.DeleteShiftAsync(shiftId);
                if(deletedShift == true)
                {
                    return Ok(new { message = $"Delete shift with ID {shiftId} successfully." });
                }
                if(deletedShift == false)
                {
                    return Ok(new { message = $"Delete shift with ID {shiftId} successfully." });
                }
                if (deletedShift == null)
                {
                    return NotFound(new { message = $"Shift with ID {shiftId} not found." });
                }
                return Ok(deletedShift);
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}
