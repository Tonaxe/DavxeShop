using DavxeShop.Models;
using DavxeShop.Persistance.Configuration;
using Microsoft.EntityFrameworkCore;

namespace DavxeShop.Persistance
{
    public class DavxeShopContext : DbContext
    {
        public DavxeShopContext(DbContextOptions<DavxeShopContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<RecoverCodes> RecoverCodes { get; set; }
        public DbSet<Productos> Productos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ProductosConfig());
            modelBuilder.Entity<User>().HasKey(u => u.UserId);
            modelBuilder.Entity<Session>().HasKey(u => u.SessionId);
            modelBuilder.Entity<RecoverCodes>().HasKey(u => u.RecoveryCodeId);
        }
    }
}
