using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using Microsoft.AspNetCore.Mvc;
using PBL3.Server.Interface;

namespace PBL3.Server.Repositories
{
    public class DutyRepo : IDuty
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public DutyRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<DutyModel>> GetAllDutiesAsync()
        {
            var duties = await _context.Duties!.ToListAsync();
            return _mapper.Map<List<DutyModel>>(duties);
        }

        public async Task<DutyModel> GetDutyByIdAsync(int id)
        {
            var duty = await _context.Duties!.FindAsync(id);
            return _mapper.Map<DutyModel>(duty);
        }

        public async Task<int> AddDutyAsync(DutyModel dutyModel)
        {
            var duty = _mapper.Map<Duty>(dutyModel);
            _context.Duties!.Add(duty);
            await _context.SaveChangesAsync();
            return duty.Id;
        }

        public async Task UpdateDutyAsync(DutyModel dutyModel)
        {
            var duty = _mapper.Map<Duty>(dutyModel);
            _context.Duties!.Update(duty);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDutyAsync(int id)
        {
            var duty = await _context.Duties!.FindAsync(id);
            _context.Duties!.Remove(duty);
            await _context.SaveChangesAsync();
        }
    }
}
