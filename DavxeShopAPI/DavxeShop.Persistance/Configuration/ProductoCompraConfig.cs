using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DavxeShop.Persistance.Configuration
{
    public class ProductoCompraConfig : IEntityTypeConfiguration<ProductoCompra>
    {
        public void Configure(EntityTypeBuilder<ProductoCompra> builder)
        {
            builder.ToTable("ProductoCompra");

            builder.HasKey(pc => pc.ProductoCompraId);

            builder.Property(pc => pc.Cantidad)
                   .IsRequired()
                   .HasDefaultValue(1);

            builder.Property(pc => pc.PrecioUnitario)
                   .IsRequired()
                   .HasColumnType("decimal(10,2)");

            builder.HasOne(pc => pc.Compra)
                   .WithMany(c => c.ProductosCompra)
                   .HasForeignKey(pc => pc.CompraId);

            builder.HasOne(pc => pc.Producto)
                   .WithMany()
                   .HasForeignKey(pc => pc.ProductoId);
        }
    }
}