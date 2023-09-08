namespace LibraryAPI.Models;

public partial class Book
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string PublishYear { get; set; } = null!;

    public Guid Category { get; set; }

    public DateTime InputDay { get; set; }

    public virtual ICollection<BookAuthor> BookAuthors { get; set; } = new List<BookAuthor>();

    public virtual ICollection<BookPublisher> BookPublishers { get; set; } = new List<BookPublisher>();

    public virtual ICollection<BookVersion> BookVersions { get; set; } = new List<BookVersion>();

    public virtual Category CategoryNavigation { get; set; } = null!;

    public virtual ICollection<UploadFile> UploadFiles { get; set; } = new List<UploadFile>();
}