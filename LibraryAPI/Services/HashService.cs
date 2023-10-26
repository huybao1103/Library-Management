using System.Security.Cryptography;
using System.Text;

namespace LibraryAPI.Services
{
    public class HashService
    {
        public HashService() { }
        public string ConvertStringToHash(String input)
        {
            byte[] data = SHA1.HashData(Encoding.Unicode.GetBytes(input));
            return Convert.ToHexString(data).ToLowerInvariant();
        }
    }
}
