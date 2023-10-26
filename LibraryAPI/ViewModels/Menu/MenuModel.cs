using LibraryAPI.ViewModels.Role;

namespace LibraryAPI.ViewModels.Menu
{
    public class MenuModel
    {
        public string? name { get; set; }
        public string? code { get; set; }
        public string? icon { get; set; }
        public string? route { get; set; }
        public MenuModel[]? subMenus { get; set; }
    }
}
