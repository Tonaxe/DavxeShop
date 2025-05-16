using DavxeShop.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DavxeShop.Persistance.Configuration
{
    public class ProductosConfig : IEntityTypeConfiguration<Productos>
    {
        public void Configure(EntityTypeBuilder<Productos> builder) {
            builder.ToTable("Productos");
            builder.HasKey(e => e.ProductId);

            builder.Property(e => e.ProductId).HasColumnName("ProductoId").ValueGeneratedOnAdd();
            builder.Property(e => e.Nombre).HasColumnName("Nombre").HasMaxLength(50).IsRequired();
            builder.Property(e => e.Descripcion).HasColumnName("Descripcion").HasMaxLength(500);
            builder.Property(e => e.Precio).HasColumnName("Precio").HasColumnType("decimal(10,2)").IsRequired();
            builder.Property(e => e.FechaPublicacion).HasColumnName("FechaPublicacion").HasColumnType("datetime").IsRequired();
            builder.Property(e => e.Categoria).HasColumnName("Categoria").HasMaxLength(100);
            builder.Property(e => e.ImagenUrl).HasColumnName("ImagenUrl").HasMaxLength(255);
            builder.Property(e => e.UserId).HasColumnName("UserId").IsRequired();
        }
    }
}

