namespace LibraryAPI.ViewModels.LibraryCard
{
    public class LibraryCardBasicInfoModel
    {
        public Guid? Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Class { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public int? Status { get; set; }

        public string? Description { get; set; }

        public string StudentId { get; set; } = null!;
    }
}
