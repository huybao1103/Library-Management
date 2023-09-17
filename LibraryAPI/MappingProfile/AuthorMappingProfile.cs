using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.Author;
using LibraryAPI.ViewModels.Book;

namespace LibraryAPI.MappingProfile
{
    public class AuthorMappingProfile : Profile
    {
        public AuthorMappingProfile() 
        {
            CreateMap<Author, AuthorModel>();
        }
    }
}
