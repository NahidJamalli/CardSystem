using System.Security.Cryptography;
using System.Text;

namespace CardSystem.Services;

public class CryptoHelpers
{
    public static string GeneratePwdHash(string plainPwd)
    {
        using var sha256Hash = SHA256.Create();
        var bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(plainPwd));  
  
        var builder = new StringBuilder();  
        foreach (var b in bytes)
        {
            builder.Append(b.ToString("x2"));
        }  
        return builder.ToString();
    }
}