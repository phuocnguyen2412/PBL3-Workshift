﻿using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Data;
using PBL3.Server.Helpers;
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
        [RolesAuthorize("Admin")]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _violateRepo.GetAllViolates());
        }

        // [HttpGet("ById/{id}")]
        // public async Task<ActionResult<Violate>> GetById(int id)
        // {
        //     var violate = await _violateRepo.GetViolateById(id);
        //     if (violate == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(violate);
        // }


        [HttpGet("ByManagerId/{managerid}")]
        [RolesAuthorize("Manager")]
        public async Task<ActionResult<Violate>> GetByManagerId(int managerid)
        {
            var violate = await _violateRepo.GetViolateByManagerId(managerid);
            if (violate == null)
            {
                return NotFound();
            }
            return Ok(violate);
        }

        [HttpGet("ByemployeeId/{employeeid}")]
        [RolesAuthorize("Admin", "Employee", "Manager")]
        public async Task<ActionResult<Violate>> GetByEmployeeId(int employeeid)
        {
            var violate = await _violateRepo.GetViolateByEmployeeId(employeeid);
            if (violate == null)
            {
                return NotFound();
            }
            return Ok(violate);
        }

        [HttpGet("ByDate")]
        [RolesAuthorize("Admin", "Employee", "Manager")]
        public async Task<ActionResult<Violate>> GetByDate(DateTime date)
        {
            var violate = await _violateRepo.GetViolateByDate(date);
            if (violate == null)
            {
                return NotFound();
            }
            return Ok(violate);
        }

        [HttpPost]
        [RolesAuthorize("Manager")]
        public async Task<ActionResult> Post(ViolateModel violatemodel)
        {
            try
            {
                var createdViolateId = await _violateRepo.AddViolate(violatemodel);
                return Ok(createdViolateId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [RolesAuthorize("Admin")]
        public async Task<IActionResult> UpdateChecked(int id, bool isChecked)
        {
            try
            {
                var success = await _violateRepo.UpdateViolateChecked(id, isChecked);

                if (success)
                {
                    return Ok(new { Message = "Update successfully!" });
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        [HttpPut("Handle/{handle}")]
        [RolesAuthorize("Admin")]
        public async Task<ActionResult> UpdateHandle(int id, int handle)
        {
            try
            {
                await _violateRepo.UpdateViolateHandle(id, handle);
                return Ok(new { Message = "Update successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }


    }
}