using System.ComponentModel.DataAnnotations;

namespace LibraryAPI.RequestModels
{
    public class ApiRequest
    {
        public string? Op { get; set; }
    }

    public class ApiRequest<T> : ApiRequest
    {
        [Required]
        public T Data { get; set; }
    }
}
