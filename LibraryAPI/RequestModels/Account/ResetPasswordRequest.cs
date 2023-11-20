namespace LibraryAPI.RequestModels.Account
{
    public class ResetPasswordRequest
    {
        public Guid AccountId { get; set; }
        public string Password { get; set; }
    }
}
