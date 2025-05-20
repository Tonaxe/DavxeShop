using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DavxeShop.Persistance.Configuration
{
    public class ProductosConfig : IEntityTypeConfiguration<Productos>
    {
        public void Configure(EntityTypeBuilder<Productos> builder)
        {
            builder.HasKey(p => p.ProductoId);
            builder.Property(p => p.Nombre).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Descripcion).HasMaxLength(500);
            builder.Property(p => p.Precio).HasColumnType("decimal(10,2)");
            builder.Property(p => p.FechaPublicacion).HasDefaultValueSql("getdate()");
            builder.Property(p => p.Categoria).HasMaxLength(50);
            builder.Property(p => p.ImagenUrl).HasColumnType("nvarchar(max)");

            builder.HasOne(p => p.User)
                   .WithMany(u => u.Productos)
                   .HasForeignKey(p => p.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

