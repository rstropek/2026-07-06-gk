using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Hosting.AGUI.AspNetCore;
using OpenAI;
using OpenAI.Responses;

const string AllowAllCorsPolicy = "AllowAll";
const string DefaultOpenAIModel = "gpt-5.4-mini";

const string ChatAgentInstructions = """
You are GkChat, a helpful and concise assistant.
Answer in the language used by the user unless they ask for another language.
Be direct, practical, and clear.
""";

var builder = WebApplication.CreateBuilder(args);

var openAIKey = builder.Configuration["OPENAI_API_KEY"];
var openAIModel = builder.Configuration["OPENAI_MODEL"] ?? DefaultOpenAIModel;

builder.Services.AddCors(static options =>
{
    options.AddPolicy(
        AllowAllCorsPolicy,
        static policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});
builder.Services.AddAGUI();
builder.Services.AddOpenApi();

var chatAgent = string.IsNullOrWhiteSpace(openAIKey)
    ? null
    : CreateChatAgent(openAIKey, openAIModel);

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
_ = app.MapGet("/health", static () => Results.Ok("ok"))
    .WithName("Health")
    .WithTags("Health")
    .Produces<string>(StatusCodes.Status200OK, "text/plain");

var chatEndpoint = chatAgent is null
    ? app.MapPost(
            "/chat",
            static () => Results.Problem(
                title: "OpenAI API key is missing",
                detail: "Configure OPENAI_API_KEY to use the chat endpoint.",
                statusCode: StatusCodes.Status500InternalServerError))
        .WithName("ChatRequiresOpenAIKey")
        .WithTags("Chat")
        .ProducesProblem(StatusCodes.Status500InternalServerError)
    : app.MapAGUI("/chat", chatAgent);
_ = chatEndpoint;

app.Run();

static AIAgent CreateChatAgent(string openAIKey, string openAIModel)
{
    OpenAIClient openAIClient = new(openAIKey);
#pragma warning disable OPENAI001
    var responsesClient = openAIClient.GetResponsesClient();
#pragma warning restore OPENAI001
    return responsesClient.AsAIAgent(
        model: openAIModel,
        instructions: ChatAgentInstructions,
        name: "GkChat");
}
