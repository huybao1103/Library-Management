using LibraryAPI.Enums;
using LibraryAPI.ViewModels.BorrowHistory;

namespace LibraryAPI.ViewModels.Book
{
    public class BookChapterModel
    {
        public Guid? Id { get; set; }

        public string? IdentifyId { get; set; }

        public string? Description { get; set; }

        public Guid? BookId { get; set; }

        public int? Chapter { get; set; }
        public int? Quantity { get; set; }

        public virtual BookBasicInfoModel? Book { get; set; }
        public virtual List<BorrowHistoryBasicInfoModel>? BorrowHistories { get; set; }
    }
}
