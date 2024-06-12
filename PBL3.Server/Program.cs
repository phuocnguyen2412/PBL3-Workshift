using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Interface;
using PBL3.Server.Repositories;
using System.Text.Json.Serialization;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>(option =>
    option.UseSqlServer(builder.Configuration.GetConnectionString("PBL3"))
);
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<IEmployee, EmployeeRepo>();
builder.Services.AddScoped<IShiftInfo, ShiftInfoRepo>();
builder.Services.AddScoped<IDuty, DutyRepo>();
builder.Services.AddScoped<IAccount, AccountRepo>();
builder.Services.AddScoped<IBonusSalary, BonusSalaryRepo>();
builder.Services.AddScoped<IViolate, ViolateRepo>();
builder.Services.AddScoped<IShift, ShiftRepo>();
builder.Services.AddScoped<ISalaryHistory, SalaryHistoryRepo>();

// Configure CORS




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



// Apply the CORS policy globally


app.UseCors(builder =>
{
    builder.WithOrigins("https://dnqz0ms3-5173.asse.devtunnels.ms", "https://kt329vqk-5173.asse.devtunnels.ms")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();

});
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
