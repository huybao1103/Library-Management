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
            CreateMap<Book, BookRequest>()
                .ForMember(request => request.Categories, opt => opt.MapFrom(src => src.BookCategories.Select(item => item.CategoryId)));

            CreateMap<Book, BookModel>();
            CreateMap<Book, BookBasicInfoModel>();

            CreateMap<BookAuthor, BookAuthorModel>();
            CreateMap<BookAuthorModel, BookAuthor>();

            CreateMap<BookImage, BookImageModel>();
            CreateMap<BookImageModel, BookImage>()
                .ForMember(x => x.Id, opt => opt.Ignore());

            CreateMap<BookCategory, BookCategoryModel>();
            CreateMap<BookCategoryModel, BookCategory>();
        }
    }
}
