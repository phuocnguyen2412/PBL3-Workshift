﻿using AutoMapper;
using PBL3.Server.Data;
using PBL3.Server.Models;
using System.Diagnostics.Eventing.Reader;
using System.Runtime.InteropServices;

namespace PBL3.Server.Helpers
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() 
        {
            CreateMap<Account, AccountModel>().ReverseMap();
            CreateMap<Employee, EmployeeModel>().ReverseMap();
            CreateMap<ShiftInfo, ShiftInfoModel>().ReverseMap();
            CreateMap<Duty, DutyModel>().ReverseMap();
            CreateMap<BonusSalaryHistory,BonusSalaryModel>().ReverseMap();
            CreateMap<Violate, ViolateModel>().ReverseMap();
            CreateMap<Shift, ShiftModel>().ReverseMap();

        }
    }
}
