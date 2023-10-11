using AutoMapper;
using LibraryAPI.Enums;
using LibraryAPI.Models;
using LibraryAPI.ViewModels.BorrowHistory;

namespace LibraryAPI.MappingProfile
{
    public class BorrowHistoryMappingProfile : Profile
    {
        public BorrowHistoryMappingProfile() 
        {
            CreateMap<BorrowHistory, BorrowHistoryModel>()
                .AfterMap((from, to) =>
                {
                    if(to.EndDate >= DateTime.Today)
                    {
                        to.Status = (int?)LibraryCardStatus.Active;
                    }
                    else
                    {
                        to.Status = (int?)LibraryCardStatus.Expired;
                    }
                });
            CreateMap<BorrowHistoryModel, BorrowHistory>();
        }
    }
}
