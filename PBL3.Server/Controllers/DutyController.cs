﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Models;
using PBL3.Server.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        [HttpGet]
        public async Task<ActionResult<List<DutyModel>>> GetAllDutiesAsync()
        {
            return await _dutyRepository.GetAllDutiesAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DutyModel>> GetDutyByIdAsync(int id)
        {
            var duty = await _dutyRepository.GetDutyByIdAsync(id);
            if (duty == null)
            {
                return NotFound();
            }
            return duty;
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddDutyAsync(DutyModel dutyModel)
        {
            var id = await _dutyRepository.AddDutyAsync(dutyModel);
            return CreatedAtAction(nameof(GetDutyByIdAsync), new { id = id }, dutyModel);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateDutyAsync(DutyModel dutyModel)
        {
            await _dutyRepository.UpdateDutyAsync(dutyModel);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDutyAsync(int id)
        {
            await _dutyRepository.DeleteDutyAsync(id);
            return NoContent();
        }
    }
}