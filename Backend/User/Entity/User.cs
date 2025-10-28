using System;

public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime CreatedAt { get; set; }

    public User(string username, string email, string password)
    {
        Id = Guid.NewGuid();
        Username = username;
        Email = email;
        Password = password;
        CreatedAt = DateTime.UtcNow;

        if (username == null)
        {
            throw new ArgumentNullException(nameof(username), "Username cannot be null");
        }

        if (email == null)
        {
            throw new ArgumentNullException(nameof(email), "Email cannot be null");
        }

        if (password == null)
        {
            throw new ArgumentNullException(nameof(password), "Password cannot be null");
        }
    }
}