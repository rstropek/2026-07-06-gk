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
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    _ = app.MapOpenApi();

    _ = app.UseSwaggerUI(static options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "GkChat API v1");
    });
}

app.UseCors(AllowAllCorsPolicy);
app.MapPingEndpoints();
app.Run();
