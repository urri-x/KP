using System.Net.Http;
using JetBrains.Annotations;

namespace KP2.Api.Helpers
{
	public interface IRazorTemplateService
	{
		[NotNull]
		string GetResult([NotNull] HttpRequestMessage request, [NotNull] string virtualPath);

		[NotNull]
		string GetResult<T>([NotNull] HttpRequestMessage request, [NotNull] string virtualPath, [NotNull] T model);
	}
}