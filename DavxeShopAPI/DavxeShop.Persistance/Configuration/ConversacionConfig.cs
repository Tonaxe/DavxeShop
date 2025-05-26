using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ConversacionConfiguration : IEntityTypeConfiguration<Conversacion>
{
    public void Configure(EntityTypeBuilder<Conversacion> builder)
    {
        builder.ToTable("Conversacion");

        builder.HasKey(c => c.ConversacionId);

        builder.Property(c => c.FechaCreacion)
            .HasDefaultValueSql("GETDATE()")
            .IsRequired();

        builder.HasOne(c => c.Comprador)
            .WithMany(u => u.ConversacionesComoComprador)
            .HasForeignKey(c => c.CompradorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(c => c.Vendedor)
            .WithMany(u => u.ConversacionesComoVendedor)
            .HasForeignKey(c => c.VendedorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(c => c.Compra)
            .WithMany()
            .HasForeignKey(c => c.CompraId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(c => c.Mensajes)
            .WithOne(m => m.Conversacion)
            .HasForeignKey(m => m.ConversacionId);
    }
}