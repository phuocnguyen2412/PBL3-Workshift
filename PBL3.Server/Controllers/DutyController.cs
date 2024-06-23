using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Helpers;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using PBL3.Server.Repositories;

namespace PBL3.Server.Controllers
{
    [RolesAuthorize("Admin")]

    [Route("api/[controller]")]
    [ApiController]
    public class DutyController : ControllerBase
    {
        private readonly IDuty _dutyRepository;

        public DutyController(IDuty dutyRepo)
        {
            _dutyRepository = dutyRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<DutyModel>>> GetAll()
        {
            return await _dutyRepository.GetAllDutiesAsync();
        }


        [HttpPost]
        public async Task<ActionResult<DutyModel>> Add(DutyModel dutyModel)
        {
            DutyModel id = await _dutyRepository.AddDutyAsync(dutyModel);

            if (id == null)
            {
                return BadRequest(new { message = "Failed to add Duty information." });
            }
            return Ok(id);
        }


        [HttpPut]
        public async Task<ActionResult> Update(DutyModel dutyModel)
        {
            await _dutyRepository.UpdateDutyAsync(dutyModel);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _dutyRepository.DeleteDutyAsync(id);
            return NoContent();
        }
    }
}
