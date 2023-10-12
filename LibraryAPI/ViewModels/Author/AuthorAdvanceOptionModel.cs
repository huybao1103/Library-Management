using LibraryAPI.Models;

namespace LibraryAPI.ViewModels.Author
{
    public class AuthorAdvanceOptionModel : Option
    {
        public String Name {  get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
    }
}
