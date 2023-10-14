using LibraryAPI.ViewModels.Book;
using LibraryAPI.ViewModels.LibraryCard;

namespace LibraryAPI.ViewModels.BorrowHistory
{
    public class BorrowHistoryModel
    {
        public Guid? Id { get; set; }

        public DateTime? BorrowDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Status { get; set; }

        public Guid? BookChapterId { get; set; }

        public Guid? LibraryCardId { get; set; }
        public string? BookName { get; set; }
        public int? Chapter { get; set; }

        public virtual BookChapterModel? BookChapter { get; set; }
        public virtual LibraryCardBasicInfoModel? LibraryCard { get; set; }
    }
}
