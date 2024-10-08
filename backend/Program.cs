using ApplicationDBContext;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CCFIDBContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
    builder => builder
        .WithOrigins("https://ccfi-dotnet-nextjs.vercel.app/") // Replace with your actual frontend URL
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials() // If you need to send cookies or auth tokens
    );
});


// Add Swagger (optional for testing)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
