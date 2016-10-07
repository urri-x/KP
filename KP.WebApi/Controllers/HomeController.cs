using System.Web.Http;
using KP.WebApi.Core.Helpers;

namespace KP2.Api.Controllers
{
	[RoutePrefix("")]
	public class HomeController : ApiController
	{
		[Route("")]
		[HttpGet]
		public object Index()
		{
		    return Request.View("~/Views/Home.cshtml");
		}
	}
}