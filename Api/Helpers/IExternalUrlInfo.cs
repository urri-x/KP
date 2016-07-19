namespace KP2.Api.Helpers
{
    public interface IExternalUrlInfo
    {
        string AppPrefix { get; }
    }

    class ExternalUrlInfo : IExternalUrlInfo
    {
        public string AppPrefix { get; }
    }
}