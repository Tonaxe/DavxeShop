using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DavxeShop.Persistance.Configuration
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.UserId);
            builder.Property(u => u.DNI).IsRequired().HasMaxLength(20);
            builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(150);
            builder.Property(u => u.BirthDate).IsRequired();
            builder.Property(u => u.City).HasMaxLength(100);
            builder.Property(u => u.Password).IsRequired().HasMaxLength(300);

            builder.HasIndex(u => u.Email).IsUnique();

            builder.HasOne(u => u.Rol)
                   .WithMany(r => r.Users)
                   .HasForeignKey(u => u.RolId)
                   .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
