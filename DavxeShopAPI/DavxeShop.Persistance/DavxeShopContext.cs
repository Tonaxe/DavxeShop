using DavxeShop.Models.dbModels;
using DavxeShop.Persistance.Configuration;
using Microsoft.EntityFrameworkCore;

namespace DavxeShop.Persistance
{
    public class DavxeShopContext : DbContext
    {
        public DavxeShopContext(DbContextOptions<DavxeShopContext> options) : base(options) { }

        public DbSet<Productos> Productos { get; set; } = null!;
        public DbSet<RecoverCode> RecoverCodes { get; set; } = null!;
        public DbSet<Session> Sessions { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Rol> Roles { get; set; } = null!;
        public DbSet<Categoria> Categorias { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProductosConfig());
            modelBuilder.ApplyConfiguration(new CategoriasConfig());
            modelBuilder.ApplyConfiguration(new RecoverCodeConfig());
            modelBuilder.ApplyConfiguration(new SessionConfig());
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new RolConfig());
        }
    }
}
