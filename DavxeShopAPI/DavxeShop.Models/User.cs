﻿namespace DavxeShop.Models
{
    public class User
    {
        public int UserId { get; set; }
        public required string DNI { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string ?City { get; set; }
        public required string Password { get; set; }
    }
}
