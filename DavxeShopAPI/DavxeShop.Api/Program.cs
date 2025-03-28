using DavxeShop.Library.Services;
using DavxeShop.Library.Services.Interfaces;
using DavxeShop.Persistance;
using DavxeShop.Persistance.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IValidations, Validations>();
builder.Services.AddTransient<IDavxeShopDboHelper, DavxeShopDboHelper>();
builder.Services.AddDbContextFactory<DavxeShopContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "DavxeShop API v1");
        c.RoutePrefix = string.Empty;
    });
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();