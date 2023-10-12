using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.RequestModels;
using LibraryAPI.ViewModels.Author;
using LibraryAPI.ViewModels.Book;

namespace LibraryAPI.MappingProfile
{
    public class AuthorMappingProfile : Profile
    {
        public AuthorMappingProfile() 
        {
            CreateMap<AuthorRequest, Author>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));

            CreateMap<Author, AuthorModel>();
            CreateMap<AuthorModel, Author>();
        }
    }
}
