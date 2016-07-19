using System.Net.Http;
using JetBrains.Annotations;

namespace KP.WebApi.Core.Helpers
{
	public interface IRazorTemplateService
	{
		[NotNull]
		string GetResult([NotNull] HttpRequestMessage request, [NotNull] string virtualPath);

		[NotNull]
		string GetResult<T>([NotNull] HttpRequestMessage request, [NotNull] string virtualPath, [NotNull] T model);
	}
}