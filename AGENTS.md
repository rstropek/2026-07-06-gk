## Documentation

To get up-to-date documentation on Microsoft-related technology including .NET and C#, use the `microsoft-docs` skill with the CLI variant, not the MCP server.

## Project Notes

- During development, the Angular client and ASP.NET Core API run as separate servers. The API intentionally allows all CORS origins for local development.
- Run the usual checks before handing off: `dotnet test GkChat.slnx`, `dotnet format GkChat.slnx --verify-no-changes`, and in `GkChat.Client`, `npm run build`, `npm run typecheck`, `npm run check`, and `npm run e2e`.
