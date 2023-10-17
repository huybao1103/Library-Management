using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.RequestModels;
using LibraryAPI.ViewModels.LibraryCard;

namespace LibraryAPI.MappingProfile
{
    public class LibraryCardMappingProfile : Profile
    {
        public LibraryCardMappingProfile() 
        {
            CreateMap<LibraryCard, LibraryCardBasicInfoModel>();
            CreateMap<LibraryCardBasicInfoModel, LibraryCard>();

            CreateMap<LibraryCard, LibraryCardModel>();
            CreateMap<LibraryCardModel, LibraryCard>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));

            CreateMap<StudentImage, StudentImageModel>();
            CreateMap<StudentImageModel, StudentImage>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));

            CreateMap<LibraryCard, LibraryCardRequest>();
            CreateMap<LibraryCardRequest, LibraryCard>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));
        }
    }
}
