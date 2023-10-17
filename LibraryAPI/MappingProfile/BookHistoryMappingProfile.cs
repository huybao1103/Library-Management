using AutoMapper;
using LibraryAPI.Enums;
using LibraryAPI.Models;
using LibraryAPI.RequestModels;
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
                    if(to.EndDate < DateTime.Today && to.Status == (int?)BorrowHistoryStatus.Active)
                    {
                        to.Status = (int?)BorrowHistoryStatus.Expired;
                    }
                });
            CreateMap<BorrowHistoryModel, BorrowHistory>();

            CreateMap<EditHistoryInfoRequest, BorrowHistory>();
        }
    }
}
