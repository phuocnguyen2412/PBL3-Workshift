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
    [Route("api/[controller]")]
    [ApiController]
    public class DutyController : ControllerBase
    {
        private readonly IDuty _dutyRepository;

        public DutyController(IDuty dutyRepo)
        {
            _dutyRepository = dutyRepo;
        }

        [RolesAuthorize(RoleEnum.Admin)]
        [HttpGet]
        public async Task<ActionResult<List<DutyModel>>> GetAllDutiesAsync()
        {
            return await _dutyRepository.GetAllDutiesAsync();
        }

        [RolesAuthorize(RoleEnum.Admin)]
        [HttpPost]
        public async Task<ActionResult<DutyModel>> AddDutyAsync(DutyModel dutyModel)
        {
            DutyModel id = await _dutyRepository.AddDutyAsync(dutyModel);

            if (id == null)
            {
                return BadRequest(new { message = "Failed to add Duty information." });
            }
            return Ok(id);
        }

        [RolesAuthorize(RoleEnum.Admin)]
        [HttpPut]
        public async Task<ActionResult> UpdateDutyAsync(DutyModel dutyModel)
        {
            await _dutyRepository.UpdateDutyAsync(dutyModel);
            return NoContent();
        }

        [RolesAuthorize(RoleEnum.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDutyAsync(int id)
        {
            await _dutyRepository.DeleteDutyAsync(id);
            return NoContent();
        }
    }
}
