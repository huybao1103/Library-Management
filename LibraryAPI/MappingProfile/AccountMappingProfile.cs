using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.Account;

namespace LibraryAPI.MappingProfile
{
    public class AccountMappingProfile : Profile
    {
        public AccountMappingProfile() 
        {
            CreateMap<Account, AccountModel>();
            CreateMap<AccountModel, Account>();
        }
    }
}
