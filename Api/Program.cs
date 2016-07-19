using Autofac;
using KP2.Api.DI;
using KP2.Api.Service;
using Topshelf;

namespace KP2.Api
{
	public static class Program
	{
		private static void Main()
		{
			HostFactory.Run(x =>
			{
				x.SetServiceName("KP2");
				x.WebApiService();
			});
		}
	}
}