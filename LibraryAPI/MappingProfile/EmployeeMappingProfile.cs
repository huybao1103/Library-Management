using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.RequestModels.Account;
using LibraryAPI.ViewModels.Employee;

namespace LibraryAPI.MappingProfile
{
    public class EmployeeMappingProfile : Profile
    {
        public EmployeeMappingProfile() 
        {
            CreateMap<Employee, EmployeeModel>();
            CreateMap<EmployeeModel, Employee>();

            CreateMap<Employee, EmployeeAccountSaveRequest>();
            CreateMap<EmployeeAccountSaveRequest, Employee>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));
        }
    }
}
