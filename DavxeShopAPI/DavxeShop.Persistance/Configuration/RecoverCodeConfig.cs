using DavxeShop.Models.dbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DavxeShop.Persistance.Configuration
{
    public class RecoverCodeConfig : IEntityTypeConfiguration<RecoverCode>
    {
        public void Configure(EntityTypeBuilder<RecoverCode> builder)
        {
            builder.HasKey(rc => rc.RecoveryCodeId);
            builder.Property(rc => rc.RecoveryCode).IsRequired().HasMaxLength(255);
            builder.Property(rc => rc.Email).IsRequired().HasMaxLength(100);
            builder.Property(rc => rc.CreatedCode).HasDefaultValueSql("getdate()");

            builder.HasOne(rc => rc.User)
                   .WithMany(u => u.RecoverCodes)
                   .HasForeignKey(rc => rc.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(rc => rc.RecoveryCode).IsUnique();
        }
    }
}
