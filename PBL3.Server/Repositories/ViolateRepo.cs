﻿using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;

namespace PBL3.Server.Repositories
{
    public class ViolateRepo : IViolate
    {
        private readonly MyDbContext _context;
        private readonly Mapper _mapper;

        public ViolateRepo(MyDbContext context, Mapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ViolateModel>> GetAllViolates()
        {
            var violates = await _context.Violates!.ToListAsync();
            return _mapper.Map<List<ViolateModel>>(violates);
        }

        public async Task<ViolateModel> GetViolateById(int id)
        {
            var violate = await _context.Violates!.FindAsync(id);
            return _mapper.Map<ViolateModel>(violate);
        }

        public async Task<int> AddViolate(ViolateModel violatemodel)
        {
            var violate = _mapper.Map<Violate>(violatemodel);
            _context.Violates.Add(violate);
            await _context.SaveChangesAsync();
            return violate.Id;
        }

        public async Task<ViolateModel> UpdateViolate(int id, ViolateModel violate)
        {
            if (id != violate.Id)
                return null;

            _context.Entry(violate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViolateExists(id))
                    return null;
                else
                    throw;
            }

            return violate;
        }

        public async Task DeleteViolate(int id)
        {
            var violate = await _context.Violates.FindAsync(id);
            if (violate != null)
            {
                _context.Violates.Remove(violate);
                await _context.SaveChangesAsync();
            }
        }

        private bool ViolateExists(int id)
        {
            return _context.Violates.Any(e => e.Id == id);
        }
    }   
}
