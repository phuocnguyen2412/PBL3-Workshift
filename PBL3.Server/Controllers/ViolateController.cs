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
    public class ViolateController : ControllerBase
    {
        private readonly IViolate _violateRepo;

        public ViolateController(IViolate violateRepo)
        {
            _violateRepo = violateRepo;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllViolates()
        {
            return Ok(await _violateRepo.GetAllViolates());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Violate>> GetViolate(int id)
        {
            var violate = await _violateRepo.GetViolateById(id);
            if (violate == null)
            {
                return NotFound();
            }
            return Ok(violate);
        }

        [HttpPost]
        public async Task<ActionResult<ViolateModel>> PostViolate(ViolateModel violatemodel)
        {
            violatemodel.Checked = false;

            var createdViolateId = await _violateRepo.AddViolate(violatemodel);
            var createdViolate = await _violateRepo.GetViolateById(createdViolateId);
            return CreatedAtAction(nameof(GetViolate), new { id = createdViolateId }, createdViolate);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateViolateChecked(int id, bool isChecked)
        {
            try
            {
                var success = await _violateRepo.UpdateViolateChecked(id, isChecked);

                if (success)
                {
                    return Ok("Update successfully!");
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }


    }
}