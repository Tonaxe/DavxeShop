using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace DavxeShop.Persistance.Configuration
{
    public class EstadoConfig : IEntityTypeConfiguration<Estado>
    {
        public void Configure(EntityTypeBuilder<Estado> builder)
        {
            builder.ToTable("Estado");
            builder.HasKey(e => e.EstadoId);
            builder.Property(e => e.Nombre).IsRequired().HasMaxLength(50);
        }
    }
}
