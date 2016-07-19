using System.Net.Http;
using JetBrains.Annotations;

namespace KP.WebApi.Core.Helpers
{
	public static class ViewResultExtensions
	{
		[NotNull]
		public static ViewResult View([NotNull] this HttpRequestMessage requestMessage, [NotNull] string viewVirtualPath)
		{
			return new ViewResult(requestMessage, viewVirtualPath);
		}

		[NotNull]
		public static ViewResult<T> View<T>([NotNull] this HttpRequestMessage requestMessage, [NotNull] string viewVirtualPath, [NotNull] T model)
		{
			return new ViewResult<T>(requestMessage, viewVirtualPath, model);
		}
	}
}