public class UpdateProfileDto
{
    public int UserId { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public DateTime BirthDate { get; set; }
    public required string Dni { get; set; }
    public required string City { get; set; }
    public string? Password { get; set; } 
    public string? ImageBase64 { get; set; }
}