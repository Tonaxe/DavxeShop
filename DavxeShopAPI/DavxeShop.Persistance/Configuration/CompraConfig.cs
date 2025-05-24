using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DavxeShop.Persistance.Configuration
{
    public class CompraConfig : IEntityTypeConfiguration<Compra>
    {
        public void Configure(EntityTypeBuilder<Compra> builder)
        {
            builder.ToTable("Compra");

            builder.HasKey(c => c.CompraId);

            builder.Property(c => c.FechaCompra)
                   .IsRequired()
                   .HasDefaultValueSql("GETDATE()");

            builder.Property(c => c.Total)
                   .HasColumnType("decimal(10,2)")
                   .IsRequired();

            builder.Property(c => c.DireccionEnvio).HasMaxLength(200);
            builder.Property(c => c.CiudadEnvio).HasMaxLength(100);
            builder.Property(c => c.Email).HasMaxLength(100);
            builder.Property(c => c.Pais).HasMaxLength(100);
            builder.Property(c => c.CodigoPostal).HasMaxLength(20);
            builder.Property(c => c.EstadoCompra).HasMaxLength(50);

            builder.HasOne(c => c.User)
                   .WithMany(u => u.Compras)
                   .HasForeignKey(c => c.UserId);
        }
    }
}
