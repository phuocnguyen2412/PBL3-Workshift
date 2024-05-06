using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using Microsoft.AspNetCore.Mvc;

namespace PBL3.Server.Repositories
{
    public class ShiftInfoRepo : IShiftInfo
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public ShiftInfoRepo(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ShiftInfoModel>> GetAllShiftInfoAsync()
        {
            var shiftInfos = await _context.ShiftInfos!.ToListAsync();
            return _mapper.Map<List<ShiftInfoModel>>(shiftInfos);
        }

        public async Task<ShiftInfoModel> GetShiftInfoByIdAsync(int id)
        {
            var shiftInfo = await _context.ShiftInfos!.FindAsync(id);
            return _mapper.Map<ShiftInfoModel>(shiftInfo);
        }

        public async Task<ShiftInfoModel> AddShiftInfoAsync(ShiftInfoModel shiftInfoModel)
        {
            var shiftInfoEntity = _mapper.Map<ShiftInfo>(shiftInfoModel);
            _context.ShiftInfos!.Add(shiftInfoEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftInfoModel>(shiftInfoEntity);
        }

        public async Task<ShiftInfoModel> UpdateShiftInfoAsync(ShiftInfoModel shiftInfoModel)
        {
            var shiftInfoEntity = _mapper.Map<ShiftInfo>(shiftInfoModel);
            _context.ShiftInfos!.Update(shiftInfoEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftInfoModel>(shiftInfoEntity);
        }

        public async Task<bool> DeleteShiftInfoAsync(int id)
        {
            var shiftInfo = await _context.ShiftInfos!.FindAsync(id);
            if (shiftInfo == null)
            {
                return false;
            }

            _context.ShiftInfos!.Remove(shiftInfo);
            await _context.SaveChangesAsync();
            return true;
        }   
    }
}
