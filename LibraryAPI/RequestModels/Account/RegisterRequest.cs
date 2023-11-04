namespace LibraryAPI.RequestModels.Account
{
    public class RegisterRequest
    {
        public string Id { get; set; }

        public string Name { get; set; } = null!;

        public string Clazz { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
