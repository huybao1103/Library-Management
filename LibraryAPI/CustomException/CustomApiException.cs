namespace LibraryAPI.CustomException
{
    public class CustomApiException : Exception
    {
        public int StatusCode { get; set; }
        public string Detail { get; set; }

        public CustomApiException(int statusCode, string message, string detail) : base(message)
        {
            StatusCode = statusCode;
            Detail = detail;
        }
    }
}
