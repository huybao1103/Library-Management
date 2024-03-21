namespace LibraryAPI.Services
{
    public class StringHelper
    {
        public static string GetAbbreviatedString(string str)
        {
            return string.Join("", str.Split(' ')
            .Select(x => x.Substring(0, 1))
            .ToArray());
        }
    }
}
