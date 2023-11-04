using LibraryAPI.Models;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Controllers;
using LibraryAPI.CustomException;
using LibraryAPI.PubSub;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using LibraryAPI.InitData;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext to service
builder.Services.AddDbContext<LibraryManagementContext>(options => 
    options.UseSqlServer("Server=HUYHUY\\HUYHUY;Database=LibraryManagement;Trusted_Connection=True;TrustServerCertificate=True"));

// Allow CORS Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularOrigins",
    builder =>
    {
        builder.WithOrigins(
                    "http://localhost:4200"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
});
});

// Allow CORS Android Studio
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAndroiStudioOrigins",
    builder =>
    {
        builder.AllowAnyOrigin()
                .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.WebHost.UseKestrel();
builder.WebHost.UseUrls("https://10.0.2.2:7082");

builder.AddPubSub((config) => { });

builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add<CustomExceptionFilter>();
});

builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

new AccountAndRoleInit();

var app = builder.Build();
app.UseCors("AllowAngularOrigins");
app.UseCors("AllowAndroiStudioOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapPubSub();

app.UseStaticFiles();

app.Run();
