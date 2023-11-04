using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.RequestModels.Account;
using LibraryAPI.ViewModels.Account;

namespace LibraryAPI.MappingProfile
{
    public class AccountMappingProfile : Profile
    {
        public AccountMappingProfile() 
        {
            CreateMap<Account, AccountModel>();
            CreateMap<AccountModel, Account>();

            CreateMap<ReaderAccountSaveRequest, Account>();
            CreateMap<Account, ReaderAccountSaveRequest>();

            CreateMap<EmployeeAccountSaveRequest, Account>();
            CreateMap<Account, EmployeeAccountSaveRequest>();
        }
    }
}
