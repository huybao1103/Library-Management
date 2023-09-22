using AutoMapper;
using LibraryAPI.Models;
using LibraryAPI.RequestModels;
using LibraryAPI.ViewModels.Book;

namespace LibraryAPI.MappingProfile
{
    public class CategoryMappingProfile : Profile
    {
        public CategoryMappingProfile() 
        {
            CreateMap<CategoryRequest, Category>();

            CreateMap<CategoryModel, Category>();
            CreateMap<Category, CategoryModel>();
        }
    }
}
