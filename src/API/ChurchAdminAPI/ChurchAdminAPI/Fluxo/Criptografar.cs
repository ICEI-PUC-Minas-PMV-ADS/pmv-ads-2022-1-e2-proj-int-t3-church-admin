using System.Globalization;
using System.Security.Cryptography;
using System.Text;

namespace ChurchAdminAPI.Fluxo
{
    public class Criptografar
    {
        public string HashValue(string senha)
        {
            UnicodeEncoding encoding = new UnicodeEncoding();
            byte[] hashBytes;
            using (HashAlgorithm hash = SHA512.Create())
                hashBytes = hash.ComputeHash(encoding.GetBytes(senha));

            StringBuilder hashValue = new StringBuilder(hashBytes.Length * 2);
            foreach (byte b in hashBytes)
            {
                hashValue.AppendFormat(CultureInfo.InvariantCulture, "{0:X2}", b);
            }

            return hashValue.ToString();
        }
    }
}
