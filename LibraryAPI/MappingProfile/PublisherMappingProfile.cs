using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.RequestModels;
using LibraryAPI.ViewModels.Publisher;

namespace LibraryAPI.MappingProfile
{
    public class PublisherMappingProfile : Profile
    {
        public PublisherMappingProfile() 
        {
            CreateMap<PublisherRequest, Publisher>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));

            CreateMap<PublisherModel, Publisher>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));
            CreateMap<Publisher, PublisherModel>();
        }
    }
}
