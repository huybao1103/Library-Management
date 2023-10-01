using LibraryAPI.Models;

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

        //public virtual ICollection<BorrowHistory> BorrowHistories { get; set; } = new List<BorrowHistory>();

        public virtual ICollection<StudentImageModel> StudentImages { get; set; } = new List<StudentImageModel>();
    }
}
