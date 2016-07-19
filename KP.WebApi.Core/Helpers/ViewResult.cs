using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;

namespace KP.WebApi.Core.Helpers
{
	public class ViewResult : IViewResult
	{
		private readonly HttpRequestMessage requestMessage;

		public ViewResult([NotNull] HttpRequestMessage requestMessage, [NotNull] string viewVirtualPath)
		{
			this.requestMessage = requestMessage;
			this.ViewVirtualPath = viewVirtualPath;
		}

		[NotNull]
		public string ViewVirtualPath { get; }

		public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
		{
			var razorTemplateService = requestMessage.GetService<IRazorTemplateService>();
			var result = razorTemplateService.GetResult(requestMessage, ViewVirtualPath);
			var response = requestMessage.CreateResponse();
			response.Content = new StringContent(result, Encoding.UTF8, "text/html");
			return Task.FromResult(response);
		}
	}

	public class ViewResult<T> : IViewResult
	{
		private readonly HttpRequestMessage requestMessage;
		private readonly T model;

		public ViewResult([NotNull] HttpRequestMessage requestMessage, [NotNull] string viewVirtualPath, [NotNull] T model)
		{
			this.requestMessage = requestMessage;
			this.ViewVirtualPath = viewVirtualPath;
			this.model = model;
		}

		[NotNull]
		public string ViewVirtualPath { get; }

		public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
		{
			var razorTemplateService = requestMessage.GetService<IRazorTemplateService>();
			var result = razorTemplateService.GetResult(requestMessage, ViewVirtualPath, model);
			var response = requestMessage.CreateResponse();
			response.Content = new StringContent(result, Encoding.UTF8, "text/html");
			return Task.FromResult(response);
		}
	}
}