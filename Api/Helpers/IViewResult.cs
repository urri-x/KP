using System.Web.Http;

namespace KP2.Api.Helpers
{
	public interface IViewResult : IHttpActionResult
	{
		string ViewVirtualPath { get; }
	}
}