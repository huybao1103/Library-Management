using LibraryAPI.Models;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Controllers;
using LibraryAPI.CustomException;
using LibraryAPI.PubSub;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext to service
builder.Services.AddDbContext<LibraryManagementContext>(options => 
    options.UseSqlServer("Server=localhost;Database=LibraryManagement;Trusted_Connection=True;TrustServerCertificate=True"));

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
                            .AllowAnyMethod();
    });
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add<CustomExceptionFilter>();
});

builder.AddPubSub((config) => { });

builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());
var app = builder.Build();
app.UseCors("AllowAngularOrigins");

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
