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
            CreateMap<UploadFileModel, UploadFile>();
        }
    }
}
