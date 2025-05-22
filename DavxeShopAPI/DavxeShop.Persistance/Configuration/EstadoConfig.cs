using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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
