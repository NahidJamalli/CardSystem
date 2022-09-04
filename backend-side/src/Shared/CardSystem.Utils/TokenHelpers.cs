using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace CardSystem.Services;

public class TokenHelpers
{
    public static string GetJwt(JwtContext context)
    {
        var secretBytes = Encoding.UTF8.GetBytes(context.Secret);
        var key = new SymmetricSecurityKey(secretBytes);
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var jwtToken = new JwtSecurityToken(
            claims: context.Claims,
            expires: context.ExpirationDate,
            signingCredentials: cred);

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(jwtToken);
    }

    public record struct JwtContext(
        string Secret,
        DateTime? ExpirationDate,
        IEnumerable<Claim> Claims);
}
