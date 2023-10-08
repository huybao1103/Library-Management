using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.Book;

namespace LibraryAPI.MappingProfile
{
    public class BookChapterMappingProfile : Profile
    {
        public BookChapterMappingProfile() 
        {
            CreateMap<BookChapter, BookChapterModel>();
            CreateMap<BookChapterModel, BookChapter>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));
        }
    }
}
