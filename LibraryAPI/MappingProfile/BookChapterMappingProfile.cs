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
            CreateMap<BookChapterModel, BookChapter>();
        }
    }
}
