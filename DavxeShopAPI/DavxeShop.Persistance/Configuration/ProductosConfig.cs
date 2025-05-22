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
            builder.Property(p => p.ImagenUrl).HasColumnType("nvarchar(max)");

            builder.HasOne(p => p.User)
                   .WithMany(u => u.Productos)
                   .HasForeignKey(p => p.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(p => p.Categoria)
                   .WithMany(c => c.Productos)
                   .HasForeignKey(p => p.CategoriaId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Estado)
                   .WithMany(e => e.Productos)
                   .HasForeignKey(p => p.EstadoId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

