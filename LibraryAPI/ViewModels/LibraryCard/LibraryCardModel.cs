using LibraryAPI.Models;
using LibraryAPI.ViewModels.Account;
using LibraryAPI.ViewModels.BorrowHistory;

namespace LibraryAPI.ViewModels.LibraryCard
{
    public class LibraryCardModel
    {
        public Guid? Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Class { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public int? Status { get; set; }

        public string? Description { get; set; }

        public string StudentId { get; set; } = null!;

        public Guid? AccountId { get; set; }

        public virtual AccountModel? Account { get; set; }

        public virtual ICollection<BorrowHistoryModel> BorrowHistories { get; set; } = new List<BorrowHistoryModel>();

        public virtual ICollection<StudentImageModel> StudentImages { get; set; } = new List<StudentImageModel>();
    }
}
