﻿namespace DavxeShop.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string DNI { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string City { get; set; }
        public string Password { get; set; }
    }
}
