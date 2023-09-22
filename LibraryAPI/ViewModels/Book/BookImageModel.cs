using LibraryAPI.ViewModels.File;

namespace LibraryAPI.ViewModels.Book
{
    public class BookImageModel
    {
        public Guid? Id { get; set; }

        public string? FilePath { get; set; }

        public Guid? FileId { get; set; }

        public Guid? BookId { get; set; }
        public string? Base64 { get; set; }

        public virtual UploadFileModel File { get; set; } = null!;
    }
}
