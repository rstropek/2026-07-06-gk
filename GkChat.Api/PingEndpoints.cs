using System.Net.Mime;

namespace GkChat.Api;

/// <summary>
/// Provides ping-related endpoint mappings.
/// </summary>
public static class PingEndpoints
{
    private const string PongResponse = "pong";

    extension(WebApplication app)
    {
        /// <summary>
        /// Maps ping-related API endpoints.
        /// </summary>
        /// <returns>The configured web application.</returns>
        public WebApplication MapPingEndpoints()
        {
            _ = app.MapGet(
                    "/ping",
                    static () => Results.Text(PongResponse, MediaTypeNames.Text.Plain))
                .WithName("Ping")
                .WithTags("Ping")
                .Produces<string>(StatusCodes.Status200OK, MediaTypeNames.Text.Plain);

            return app;
        }
    }
}
