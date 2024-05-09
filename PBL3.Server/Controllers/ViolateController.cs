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

        // GET: api/Violate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Violate>>> GetViolates()
        {
            return Ok(await _violateRepo.GetAllViolates());
        }

        // GET: api/Violate/5
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

        // POST: api/Violate
        /*[HttpPost]
        public async Task<ActionResult<ViolateModel>> PostViolate(ViolateModel violatemodel)
        {
            var createdViolate = await _violateRepo.AddViolate(violatemodel);
            return CreatedAtAction(nameof(GetViolate), new { id = Id }, createdViolate);
        }
        */

        // PUT: api/Violate/5
       /* [HttpPut("{id}")]
        public async Task<IActionResult> PutViolate(int id, Violate violate)
        {
            var updatedViolate = await _violateRepo.UpdateViolate(id, violate);
            if (updatedViolate == null)
                return NotFound();
            return NoContent();
        }
       */

        // DELETE: api/Violate/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteViolate(int id)
        {
            await _violateRepo.DeleteViolate(id);
            return NoContent();
        }
    }
}
