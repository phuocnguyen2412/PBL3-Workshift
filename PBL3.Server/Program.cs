using Microsoft.EntityFrameworkCore;
using PBL3.Server.Data;
using PBL3.Server.Repositories;
using PBL3.Server.Interface;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(option => option.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddDbContext<MyDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("PBL3")));
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<IEmployee, EmployeeRepo>();
builder.Services.AddScoped<IShiftInfo, ShiftInfoRepo>();
builder.Services.AddScoped<IDuty, DutyRepo>();
builder.Services.AddScoped<IAccount, AccountRepo>();
builder.Services.AddScoped<IBonusSalary, BonusSalaryRepo>();
builder.Services.AddScoped<IViolate, ViolateRepo>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors();
app.Run();
