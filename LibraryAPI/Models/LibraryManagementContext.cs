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

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<BookAuthor> BookAuthors { get; set; }

    public virtual DbSet<BookCategory> BookCategories { get; set; }

    public virtual DbSet<BookImage> BookImages { get; set; }

    public virtual DbSet<BookPublisher> BookPublishers { get; set; }

    public virtual DbSet<BookVersion> BookVersions { get; set; }

    public virtual DbSet<BorrowHistory> BorrowHistories { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Publisher> Publishers { get; set; }

    public virtual DbSet<StudentCard> StudentCards { get; set; }

    public virtual DbSet<StudentImage> StudentImages { get; set; }

    public virtual DbSet<UploadFile> UploadFiles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=LibraryManagement;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Authors__3213E83FACC062F5");

            entity.HasIndex(e => e.Name, "UQ__Authors__72E12F1BBBBD314B").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Mail)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("mail");
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Books__3213E83FA61FA405");

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
            entity.HasKey(e => e.Id).HasName("PK__BookAuth__3213E83FF3A4F60B");

            entity.ToTable("BookAuthor");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AuthorId).HasColumnName("authorId");
            entity.Property(e => e.BookId).HasColumnName("bookId");

            entity.HasOne(d => d.Author).WithMany(p => p.BookAuthors)
                .HasForeignKey(d => d.AuthorId)
                .HasConstraintName("FK__BookAutho__autho__60A75C0F");

            entity.HasOne(d => d.Book).WithMany(p => p.BookAuthors)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookAutho__bookI__5FB337D6");
        });

        modelBuilder.Entity<BookCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookCate__3213E83FCCBA7B5B");

            entity.ToTable("BookCategory");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.CategoryId).HasColumnName("categoryId");

            entity.HasOne(d => d.Book).WithMany(p => p.BookCategories)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookCateg__bookI__693CA210");

            entity.HasOne(d => d.Category).WithMany(p => p.BookCategories)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__BookCateg__categ__6A30C649");
        });

        modelBuilder.Entity<BookImage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookImag__3213E83FCB2B3B04");

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
                .HasConstraintName("FK__BookImage__bookI__6383C8BA");

            entity.HasOne(d => d.File).WithMany(p => p.BookImages)
                .HasForeignKey(d => d.FileId)
                .HasConstraintName("FK__BookImage__fileI__6477ECF3");
        });

        modelBuilder.Entity<BookPublisher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookPubl__3213E83F62F14B8E");

            entity.ToTable("BookPublisher");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.PublisherId).HasColumnName("publisherId");

            entity.HasOne(d => d.Book).WithMany(p => p.BookPublishers)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookPubli__bookI__619B8048");

            entity.HasOne(d => d.Publisher).WithMany(p => p.BookPublishers)
                .HasForeignKey(d => d.PublisherId)
                .HasConstraintName("FK__BookPubli__publi__628FA481");
        });

        modelBuilder.Entity<BookVersion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookVers__3213E83F1D0EA383");

            entity.ToTable("BookVersion");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.Description)
                .HasMaxLength(20)
                .HasColumnName("description");
            entity.Property(e => e.IdentifyId).HasColumnName("identifyId");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Version).HasColumnName("version");

            entity.HasOne(d => d.Book).WithMany(p => p.BookVersions)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BookVersi__bookI__5EBF139D");
        });

        modelBuilder.Entity<BorrowHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BorrowHi__3213E83F491E3FB9");

            entity.ToTable("BorrowHistory");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.BorrowDate)
                .HasColumnType("date")
                .HasColumnName("borrowDate");
            entity.Property(e => e.EndDate)
                .HasColumnType("date")
                .HasColumnName("endDate");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.StudentCardId).HasColumnName("studentCardId");

            entity.HasOne(d => d.Book).WithMany(p => p.BorrowHistories)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BorrowHis__bookI__6754599E");

            entity.HasOne(d => d.StudentCard).WithMany(p => p.BorrowHistories)
                .HasForeignKey(d => d.StudentCardId)
                .HasConstraintName("FK__BorrowHis__stude__68487DD7");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3213E83F819EFE45");

            entity.HasIndex(e => e.Name, "UQ__Categori__72E12F1B10884DD0").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(20)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(15)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Publisher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Publishe__3213E83FE6AC1813");

            entity.HasIndex(e => e.Name, "UQ__Publishe__72E12F1BE04E06C4").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(30)
                .HasColumnName("address");
            entity.Property(e => e.Mail)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("mail");
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<StudentCard>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StudentC__3213E83F234885F2");

            entity.HasIndex(e => e.Name, "UQ__StudentC__72E12F1B362AF90E").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Class)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("class");
            entity.Property(e => e.Description)
                .HasMaxLength(20)
                .HasColumnName("description");
            entity.Property(e => e.ExpiryDate)
                .HasColumnType("date")
                .HasColumnName("expiryDate");
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .HasColumnName("name");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.StudentId).HasColumnName("studentId");
        });

        modelBuilder.Entity<StudentImage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StudentI__3213E83FF6AEC9C5");

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
            entity.Property(e => e.StudentCardId).HasColumnName("studentCardId");

            entity.HasOne(d => d.File).WithMany(p => p.StudentImages)
                .HasForeignKey(d => d.FileId)
                .HasConstraintName("FK__StudentIm__fileI__66603565");

            entity.HasOne(d => d.StudentCard).WithMany(p => p.StudentImages)
                .HasForeignKey(d => d.StudentCardId)
                .HasConstraintName("FK__StudentIm__stude__656C112C");
        });

        modelBuilder.Entity<UploadFile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UploadFi__3213E83F61DA0912");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.FileName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("fileName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
