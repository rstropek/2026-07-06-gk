using GkChat.Api;

const string AllowAllCorsPolicy = "AllowAll";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(static options =>
{
    options.AddPolicy(
        AllowAllCorsPolicy,
        static policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors(AllowAllCorsPolicy);
app.MapPingEndpoints();
app.Run();
