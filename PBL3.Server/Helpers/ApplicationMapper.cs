using AutoMapper;
using BE.Models;
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
        }
    }
}
