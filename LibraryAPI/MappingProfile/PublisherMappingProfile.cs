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
            CreateMap<PublisherRequest, Publisher>();
            CreateMap<PublisherModel, Publisher>();
            CreateMap<Publisher, PublisherModel>();
        }
    }
}
