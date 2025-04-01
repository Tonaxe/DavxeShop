using DavxeShop.Models;
using Microsoft.EntityFrameworkCore;

namespace DavxeShop.Persistance
{
    public class DavxeShopContext : DbContext
    {
        public DavxeShopContext(DbContextOptions<DavxeShopContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<RecoverCodes> RecoverCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasKey(u => u.UserId);
            modelBuilder.Entity<Session>().HasKey(u => u.SessionId);
            modelBuilder.Entity<RecoverCodes>().HasKey(u => u.RecoveryCodeId);
        }
    }
}
