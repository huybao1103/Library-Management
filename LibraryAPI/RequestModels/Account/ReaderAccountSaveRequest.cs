namespace LibraryAPI.RequestModels.Account
{
    public class ReaderAccountSaveRequest
    {
        public Guid? Id { get; set; }
        public Guid LibraryCardId { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
    }
}
