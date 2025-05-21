using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DavxeShop.Persistance.Configuration
{
    public class CategoriasConfig : IEntityTypeConfiguration<Categoria>
    {
        public void Configure(EntityTypeBuilder<Categoria> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Categoriaa)
                   .IsRequired()
                   .HasMaxLength(50);
        }
    }
}
