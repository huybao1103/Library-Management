using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Models;

public partial class LibraryManagementContext : DbContext
{
    public LibraryManagementContext()
    {
    }

    public LibraryManagementContext(DbContextOptions<LibraryManagementContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<BookAuthor> BookAuthors { get; set; }

    public virtual DbSet<BookCategory> BookCategories { get; set; }

    public virtual DbSet<BookChapter> BookChapters { get; set; }

    public virtual DbSet<BookImage> BookImages { get; set; }

    public virtual DbSet<BookPublisher> BookPublishers { get; set; }

    public virtual DbSet<BorrowHistory> BorrowHistories { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<LibraryCard> LibraryCards { get; set; }

    public virtual DbSet<Publisher> Publishers { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RoleModulePermission> RoleModulePermissions { get; set; }

    public virtual DbSet<StudentImage> StudentImages { get; set; }

    public virtual DbSet<UploadFile> UploadFiles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-A71PO2U0\\SQLEXPRESS01;Database=LibraryManagement;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Accounts__3213E83F1FDEF0EA");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.PasswordHash)
                .IsUnicode(false)
                .HasColumnName("passwordHash");
            entity.Property(e => e.RoleId).HasColumnName("roleId");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Accounts__roleId__7B5B524B");
        });

        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Authors__3213E83FE4E99741");

            entity.HasIndex(e => e.Name, "UQ__Authors__72E12F1BA6EAA038").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Mail)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("mail");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Books__3213E83F56E23E69");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.InputDay)
                .HasColumnType("date")
                .HasColumnName("inputDay");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.PublishYear)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("publishYear");
        });

        modelBuilder.Entity<BookAuthor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookAuth__3213E83F093364EF");

            entity.ToTable("BookAuthor");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AuthorId).HasColumnName("authorId");
            entity.Property(e => e.BookId).HasColumnName("bookId");

            entity.HasOne(d => d.Author).WithMany(p => p.BookAuthors)
                .HasForeignKey(d => d.AuthorId)
                .HasConstraintName("FK__BookAutho__autho__6EF57B66");

            entity.HasOne(d => d.Book).WithMany(p => p.BookAuthors)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookAutho__bookI__6E01572D");
        });

        modelBuilder.Entity<BookCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookCate__3213E83F3959E65E");

            entity.ToTable("BookCategory");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.CategoryId).HasColumnName("categoryId");

            entity.HasOne(d => d.Book).WithMany(p => p.BookCategories)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookCateg__bookI__778AC167");

            entity.HasOne(d => d.Category).WithMany(p => p.BookCategories)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__BookCateg__categ__787EE5A0");
        });

        modelBuilder.Entity<BookChapter>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookChap__3213E83FAC01AFE7");

            entity.ToTable("BookChapter");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.Chapter).HasColumnName("chapter");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.IdentifyId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("identifyId");
            entity.Property(e => e.LostOrDestroyedDate)
                .HasColumnType("date")
                .HasColumnName("lostOrDestroyedDate");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Book).WithMany(p => p.BookChapters)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookChapt__bookI__6D0D32F4");
        });

        modelBuilder.Entity<BookImage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookImag__3213E83FFBD1081F");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Base64)
                .IsUnicode(false)
                .HasColumnName("base64");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.FileId).HasColumnName("fileId");
            entity.Property(e => e.FilePath)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("filePath");

            entity.HasOne(d => d.Book).WithMany(p => p.BookImages)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookImage__bookI__71D1E811");

            entity.HasOne(d => d.File).WithMany(p => p.BookImages)
                .HasForeignKey(d => d.FileId)
                .HasConstraintName("FK__BookImage__fileI__72C60C4A");
        });

        modelBuilder.Entity<BookPublisher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookPubl__3213E83F67A31182");

            entity.ToTable("BookPublisher");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.PublisherId).HasColumnName("publisherId");

            entity.HasOne(d => d.Book).WithMany(p => p.BookPublishers)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookPubli__bookI__6FE99F9F");

            entity.HasOne(d => d.Publisher).WithMany(p => p.BookPublishers)
                .HasForeignKey(d => d.PublisherId)
                .HasConstraintName("FK__BookPubli__publi__70DDC3D8");
        });

        modelBuilder.Entity<BorrowHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BorrowHi__3213E83FF34BB025");

            entity.ToTable("BorrowHistory");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookChapterId).HasColumnName("bookChapterId");
            entity.Property(e => e.BorrowDate)
                .HasColumnType("date")
                .HasColumnName("borrowDate");
            entity.Property(e => e.EndDate)
                .HasColumnType("date")
                .HasColumnName("endDate");
            entity.Property(e => e.LibraryCardId).HasColumnName("libraryCardId");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.BookChapter).WithMany(p => p.BorrowHistories)
                .HasForeignKey(d => d.BookChapterId)
                .HasConstraintName("FK__BorrowHis__bookC__75A278F5");

            entity.HasOne(d => d.LibraryCard).WithMany(p => p.BorrowHistories)
                .HasForeignKey(d => d.LibraryCardId)
                .HasConstraintName("FK__BorrowHis__libra__76969D2E");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3213E83F394461AC");

            entity.HasIndex(e => e.Name, "UQ__Categori__72E12F1B21647F10").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(15)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3213E83F44EEFEDA");

            entity.HasIndex(e => e.Name, "UQ__Employee__72E12F1BE0D49147").IsUnique();

            entity.HasIndex(e => e.CitizenId, "UQ__Employee__E838FE20531757A5").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.BirthDate)
                .HasColumnType("date")
                .HasColumnName("birthDate");
            entity.Property(e => e.CitizenId)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("citizenId");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<LibraryCard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LibraryC__3213E83F503DA2E8");

            entity.HasIndex(e => e.Name, "UQ__LibraryC__72E12F1BA07EE8D8").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.Class)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("class");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ExpiryDate)
                .HasColumnType("date")
                .HasColumnName("expiryDate");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.StudentId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("studentId");
        });

        modelBuilder.Entity<Publisher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Publishe__3213E83F12D75634");

            entity.HasIndex(e => e.Name, "UQ__Publishe__72E12F1BB7F02E91").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .HasColumnName("address");
            entity.Property(e => e.Mail)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("mail");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3213E83FD80E5F78");

            entity.HasIndex(e => e.Name, "UQ__Roles__72E12F1BB66486DC").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<RoleModulePermission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RoleModu__3213E83F0A6E2B61");

            entity.ToTable("RoleModulePermission");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Access).HasColumnName("access");
            entity.Property(e => e.Create).HasColumnName("create");
            entity.Property(e => e.Delete).HasColumnName("delete");
            entity.Property(e => e.Detail).HasColumnName("detail");
            entity.Property(e => e.Edit).HasColumnName("edit");
            entity.Property(e => e.Module).HasColumnName("module");
            entity.Property(e => e.RoleId).HasColumnName("roleId");

            entity.HasOne(d => d.Role).WithMany(p => p.RoleModulePermissions)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__RoleModul__roleI__7C4F7684");
        });

        modelBuilder.Entity<StudentImage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StudentI__3213E83FF25468F4");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Base64)
                .IsUnicode(false)
                .HasColumnName("base64");
            entity.Property(e => e.FileId).HasColumnName("fileId");
            entity.Property(e => e.FilePath)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("filePath");
            entity.Property(e => e.LibraryCardId).HasColumnName("libraryCardId");

            entity.HasOne(d => d.File).WithMany(p => p.StudentImages)
                .HasForeignKey(d => d.FileId)
                .HasConstraintName("FK__StudentIm__fileI__74AE54BC");

            entity.HasOne(d => d.LibraryCard).WithMany(p => p.StudentImages)
                .HasForeignKey(d => d.LibraryCardId)
                .HasConstraintName("FK__StudentIm__libra__73BA3083");
        });

        modelBuilder.Entity<UploadFile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UploadFi__3213E83F04FE3495");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.FileName)
                .IsUnicode(false)
                .HasColumnName("fileName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
