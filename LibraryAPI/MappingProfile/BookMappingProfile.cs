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
            CreateMap<BookRequest, Book>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));
            CreateMap<Book, BookRequest>()
                .ForMember(request => request.Categories, opt => opt.MapFrom(src => src.BookCategories.Select(item => item.CategoryId)));

            CreateMap<Book, BookModel>();
            CreateMap<Book, BookBasicInfoModel>();

            CreateMap<BookAuthor, BookAuthorModel>();
            CreateMap<BookAuthorModel, BookAuthor>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));

            CreateMap<BookImage, BookImageModel>();
            CreateMap<BookImageModel, BookImage>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));

            CreateMap<BookCategory, BookCategoryModel>();
            CreateMap<BookCategoryModel, BookCategory>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));

            CreateMap<BookPublisher, BookPublisherModel>();
            CreateMap<BookPublisherModel, BookPublisher>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals("")));
        }
    }
}
