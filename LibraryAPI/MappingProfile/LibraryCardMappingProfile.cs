using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.LibraryCard;

namespace LibraryAPI.MappingProfile
{
    public class LibraryCardMappingProfile : Profile
    {
        public LibraryCardMappingProfile() 
        {
            CreateMap<LibraryCard, LibraryCardModel>();
            CreateMap<LibraryCardModel, LibraryCard>();
        }
    }
}
