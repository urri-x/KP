using Autofac;
using KP.Api.Core.Service;
using KP.Api.DI;
using Topshelf;

namespace KP.Api
{
	public static class Program
	{
		private static void Main()
		{
			HostFactory.Run(x =>
			{
				x.SetServiceName("KP.Web");
				x.WebApiService(b=>b.RegisterModule<ApiAutofacModule>());
			});
		}
	}
}