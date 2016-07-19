using System.Web.Http;

namespace KP.WebApi.Core.Helpers
{
	public interface IViewResult : IHttpActionResult
	{
		string ViewVirtualPath { get; }
	}
}