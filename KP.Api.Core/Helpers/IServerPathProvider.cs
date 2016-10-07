using JetBrains.Annotations;

namespace KP.WebApi.Core.Helpers
{
	public interface IServerPathProvider
	{
		[CanBeNull]
		string MapPath([NotNull] string virtualPath);
	}
}