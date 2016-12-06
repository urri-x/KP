using System;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Web.Http;
using System.Web.Http.Dependencies;
using Microsoft.Owin.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;

namespace KP.Api.Core.Service
{
    public class WebApiService
    {
        private readonly IDependencyResolver dependencyResolver;

        private IDisposable server;
        private int port = 9999;

        public WebApiService(IDependencyResolver dependencyResolver)
        {
            this.dependencyResolver = dependencyResolver;
        }

        public void Shutdown()
        {

        }

        public void Start()
        {
            StartOptions options = new StartOptions();
            // todo this must be settings
            options.Urls.Add($"http://localhost:{port}");
            options.Urls.Add($"http://127.0.0.1:{port}");
            options.Urls.Add($"http://{Environment.MachineName}:{port}");

            server = WebApp.Start(options, Configuration);
        }

        public void Stop()
        {
            server.Dispose();
        }
        private  void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            // DI
            config.DependencyResolver = dependencyResolver;

            // Formatters
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            config.Formatters.JsonFormatter.SerializerSettings.Formatting = Formatting.Indented;
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue(MediaTypeNames.Text.Html));
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            // Authentication
            config.SuppressHostPrincipal();

            // Routing
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "Error404",
                routeTemplate: "{*url}",
                defaults: new { controller = "Error", action = "Handle404" });

            app.UseStaticFiles();
            app.UseWebApi(config);
        }
    }

}
