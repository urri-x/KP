using Autofac;
using KP.WebApi.Core.Service;
using KP.WebApi.DI;
using Topshelf;

namespace KP.WebApi
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