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

        public async Task<ShiftInfoModel?> UpdateShiftInfoAsync(ShiftInfoModel shiftInfoModel)
        {
            var existingShiftInfo = await _context.ShiftInfos!.FindAsync(shiftInfoModel.Id);
            if (existingShiftInfo == null)
            {
                return null;
            }
            _mapper.Map(shiftInfoModel, existingShiftInfo);

            _context.ShiftInfos.Update(existingShiftInfo);
            await _context.SaveChangesAsync();

            return _mapper.Map<ShiftInfoModel>(existingShiftInfo);
        }


        public async Task<ShiftInfoModel> UpdateShiftInfoCheckedAsync(int id, bool isChecked)
        {
            var shiftInfo = await _context.ShiftInfos!.FindAsync(id);
            if (shiftInfo == null)
            {
                return null;
            }

            shiftInfo.Checked = isChecked;
            _context.ShiftInfos!.Update(shiftInfo);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftInfoModel>(shiftInfo);
        }

        public async Task<ShiftInfoModel> DeleteShiftInfoAsync(int id)
        {
            var shiftInfo = await _context.ShiftInfos!.FindAsync(id);
            if (shiftInfo == null)
            {
                return null;
            }

            _context.ShiftInfos!.Remove(shiftInfo);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShiftInfoModel>(shiftInfo);
        }

    }
}
