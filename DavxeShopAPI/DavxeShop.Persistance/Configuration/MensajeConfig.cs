using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DavxeShop.Persistance.Configuration
{
    public class MensajeConfiguration : IEntityTypeConfiguration<Mensaje>
    {
        public void Configure(EntityTypeBuilder<Mensaje> builder)
        {
            builder.ToTable("Mensaje");

            builder.HasKey(m => m.MensajeId);

            builder.Property(m => m.FechaEnvio)
                .HasDefaultValueSql("GETDATE()")
                .IsRequired();

            builder.Property(m => m.Leido)
                .HasDefaultValue(false)
                .IsRequired();

            builder.Property(m => m.Contenido)
                .IsRequired();

            builder.HasOne(m => m.Remitente)
                .WithMany(u => u.MensajesEnviados)
                .HasForeignKey(m => m.RemitenteId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(m => m.Conversacion)
                .WithMany(c => c.Mensajes)
                .HasForeignKey(m => m.ConversacionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
