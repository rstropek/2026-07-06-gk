namespace GkChat.Api.Tests;

/// <summary>
/// Verifies that the xUnit test infrastructure runs.
/// </summary>
public sealed class UnitTest1
{
    /// <summary>
    /// Verifies a trivial arithmetic assertion.
    /// </summary>
    [Fact]
    public void OnePlusOneIsTwo()
    {
        Assert.Equal(2, 1 + 1);
    }
}
