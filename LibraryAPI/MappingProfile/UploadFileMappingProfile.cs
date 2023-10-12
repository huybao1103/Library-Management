using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.File;

namespace LibraryAPI.MappingProfile
{
    public class UploadFileMappingProfile : Profile
    {
        public UploadFileMappingProfile() 
        {
            CreateMap<UploadFile, UploadFileModel>();
            CreateMap<UploadFileModel, UploadFile>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));
        }
    }
}
