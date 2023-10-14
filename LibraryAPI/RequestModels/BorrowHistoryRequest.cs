namespace LibraryAPI.RequestModels
{
    public class BorrowHistoryRequest
    {
        public Guid? Id { get; set; }

        public DateTime? BorrowDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Status { get; set; }

        public Guid? BookChapterId { get; set; }

        public Guid? LibraryCardId { get; set; }
    }
}
