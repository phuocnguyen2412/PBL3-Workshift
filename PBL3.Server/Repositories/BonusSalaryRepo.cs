using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;

namespace PBL3.Server.Repositories
{
    public class BonusSalaryRepo : IBonusSalary
    {
        private MyDbContext _context;
        private IMapper _mapper;

        public BonusSalaryRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<BonusSalaryModel>> GetAllBonusSalaries()
        {
            var bonusSalaries = await _context.BonusSalaryHistories!.ToListAsync();
            return _mapper.Map<List<BonusSalaryModel>>(bonusSalaries);
        }

        public async Task<int> AddBonusSalaryAsync(BonusSalaryModel model)
        {
            var bonusSalary = _mapper.Map<BonusSalaryHistory>(model);
            _context.BonusSalaryHistories!.Add(bonusSalary);
            await _context.SaveChangesAsync();
            return bonusSalary.Id;
        }

        public async Task UpdateBonusSalaryAsync(BonusSalaryModel model)
        {
            var bonusSalary = _mapper.Map<BonusSalaryHistory>(model);
            _context.BonusSalaryHistories!.Update(bonusSalary);
            await _context.SaveChangesAsync();
        }

    }
    
}
