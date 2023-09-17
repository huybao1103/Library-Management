using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.RequestModels;
using LibraryAPI.ViewModels.Book;

namespace LibraryAPI.MappingProfile
{
    public class BookMappingProfile : Profile
    {
        public BookMappingProfile()
        {
            CreateMap<BookRequest, Book>();

            CreateMap<Book, BookModel>();
            CreateMap<Book, BookBasicInfoModel>();

            CreateMap<BookAuthor, BookAuthorModel>();

        }
    }
}
