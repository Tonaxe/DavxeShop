using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DavxeShop.Persistance.Configuration
{
    public class FavoritoConfig : IEntityTypeConfiguration<Favorito>
    {
        public void Configure(EntityTypeBuilder<Favorito> builder)
        {
            builder.ToTable("Favoritos");
            builder.HasKey(f => f.FavoritoId);

            builder.Property(f => f.FechaCreacion)
                   .IsRequired();

            builder.HasIndex(f => new { f.UserId, f.ProductoId })
                   .IsUnique();

            builder.HasOne(f => f.User)
                   .WithMany(u => u.Favoritos)
                   .HasForeignKey(f => f.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(f => f.Producto)
                   .WithMany(p => p.Favoritos)
                   .HasForeignKey(f => f.ProductoId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
