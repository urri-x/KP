using JetBrains.Annotations;

namespace KP2.Api.Helpers
{
	public interface IServerPathProvider
	{
		[CanBeNull]
		string MapPath([NotNull] string virtualPath);
	}
}