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

            CreateMap<EmployeeAccountSaveRequest, Account>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));
            CreateMap<Account, EmployeeAccountSaveRequest>();
        }
    }
}
