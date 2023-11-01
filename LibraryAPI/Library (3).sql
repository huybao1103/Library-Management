use master
if exists (select * from sysdatabases where name = 'LibraryManagement')
	drop database LibraryManagement
go
create database LibraryManagement
go
use LibraryManagement
go

CREATE TABLE [Books] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [name] nvarchar(50) NOT NULL,
  [publishYear] varchar(4),
  [inputDay] date
)
GO

CREATE TABLE [BookChapter] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [identifyId] varchar(10),
  [status] int,
  [description] nvarchar(max),
  [bookId] uniqueidentifier NULL,
  [chapter] int,
  [lostOrDestroyedDate] date NULL,
)
GO

CREATE TABLE [Authors] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [name] nvarchar(50) UNIQUE NOT NULL,
  [mail] varchar(20),
  [phone] varchar(12)
)
GO

CREATE TABLE [BookAuthor] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [authorId] uniqueidentifier NULL,
  [bookId] uniqueidentifier NULL
)
GO

CREATE TABLE [Publishers] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [name] nvarchar(100) UNIQUE NOT NULL,
  [mail] varchar(15),
  [phone] varchar(12),
  [address] nvarchar(100)
)
GO

CREATE TABLE [BookPublisher] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [publisherId] uniqueidentifier NULL,
  [bookId] uniqueidentifier NULL
)
GO

CREATE TABLE [Categories] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [name] nvarchar(15) UNIQUE NOT NULL,
  [description] nvarchar(max)
)
GO

CREATE TABLE [BookCategory] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [categoryId] uniqueidentifier NULL,
  [bookId] uniqueidentifier NULL
)
GO

CREATE TABLE [UploadFiles] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [fileName] varchar(max)
)
GO

CREATE TABLE [BookImages] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [filePath] varchar(50),
  [fileId] uniqueidentifier NULL,
  [bookId] uniqueidentifier NULL,
  [base64] varchar(MAX) NULL
)
GO

CREATE TABLE [LibraryCards] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [name] nvarchar(50) UNIQUE NOT NULL,
  [class] varchar(10),
  [expiryDate] date,
  [status] int,
  [description] nvarchar(max),
  [studentId] varchar(10) NOT NULL,
  [accountId] uniqueidentifier NULL
)
GO

CREATE TABLE [StudentImages] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [filePath] varchar(50),
  [fileId] uniqueidentifier NULL,
  [libraryCardId] uniqueidentifier NULL,
  [base64] varchar(MAX) NULL
)
GO

CREATE TABLE [BorrowHistory] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [borrowDate] date,
  [endDate] date,
  [status] int,
  [bookChapterId] uniqueidentifier NULL,
  [libraryCardId] uniqueidentifier NULL,
)
GO

CREATE TABLE [Accounts] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [email] varchar(50),
  [passwordHash] varchar(max),
  [roleId] uniqueidentifier NULL,
  [status] bit
)
GO

CREATE TABLE [Employees] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [name] nvarchar(50) UNIQUE,
  [citizenId] varchar(15) UNIQUE,
  [birthDate] date,
  [joinDate] date,
  [accountId] uniqueidentifier NULL
)
GO

CREATE TABLE [Roles] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [name] nvarchar(50) UNIQUE,
  [normalizedName] nvarchar(50)
)
GO

CREATE TABLE [RoleModulePermission] (
  [id] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
  [module] int,
  [access] bit,
  [detail] bit,
  [create] bit,
  [edit] bit,
  [delete] bit,
  [roleId] uniqueidentifier NULL
)
GO

ALTER TABLE [BookChapter] ADD FOREIGN KEY ([bookId]) REFERENCES [Books] ([id])
GO

ALTER TABLE [BookAuthor] ADD FOREIGN KEY ([bookId]) REFERENCES [Books] ([id])
GO

ALTER TABLE [BookAuthor] ADD FOREIGN KEY ([authorId]) REFERENCES [Authors] ([id])
GO

ALTER TABLE [BookPublisher] ADD FOREIGN KEY ([bookId]) REFERENCES [Books] ([id])
GO

ALTER TABLE [BookPublisher] ADD FOREIGN KEY ([publisherId]) REFERENCES [Publishers] ([id])
GO

ALTER TABLE [BookImages] ADD FOREIGN KEY ([bookId]) REFERENCES [Books] ([id])
GO

ALTER TABLE [BookImages] ADD FOREIGN KEY ([fileId]) REFERENCES [UploadFiles] ([id])
GO

ALTER TABLE [StudentImages] ADD FOREIGN KEY ([libraryCardId]) REFERENCES [LibraryCards] ([id])
GO

ALTER TABLE [StudentImages] ADD FOREIGN KEY ([fileId]) REFERENCES [UploadFiles] ([id])
GO

ALTER TABLE [BorrowHistory] ADD FOREIGN KEY ([bookChapterId]) REFERENCES [BookChapter] ([id])
GO

ALTER TABLE [BorrowHistory] ADD FOREIGN KEY ([libraryCardId]) REFERENCES [LibraryCards] ([id])
GO

ALTER TABLE [BookCategory] ADD FOREIGN KEY ([bookId]) REFERENCES [Books] ([id])
GO

ALTER TABLE [BookCategory] ADD FOREIGN KEY ([categoryId]) REFERENCES [Categories] ([id])
GO

ALTER TABLE [Accounts] ADD FOREIGN KEY ([roleId]) REFERENCES [Roles] ([id])
GO

ALTER TABLE [RoleModulePermission] ADD FOREIGN KEY ([roleId]) REFERENCES [Roles] ([id])
GO

