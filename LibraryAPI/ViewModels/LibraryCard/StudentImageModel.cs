using LibraryAPI.ViewModels.File;

namespace LibraryAPI.ViewModels.LibraryCard
{
    public class StudentImageModel
    {
        public Guid? Id { get; set; }

        public string? FilePath { get; set; }

        public Guid? FileId { get; set; }

        public Guid? LibraryCardId { get; set; }

        public string? Base64 { get; set; }

        public virtual UploadFileModel? File { get; set; }
    }
}
