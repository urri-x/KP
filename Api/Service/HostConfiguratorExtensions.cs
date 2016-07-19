using System;
using System.Web.Http.Dependencies;
using Autofac;
using JetBrains.Annotations;
using KP2.Api.DI;
using Topshelf;
using Topshelf.HostConfigurators;
using Topshelf.ServiceConfigurators;

namespace KP2.Api.Service
{
    public static class HostConfiguratorExtensions
    {
        [NotNull]
        public static HostConfigurator WebApiService([NotNull] this HostConfigurator configurator, [CanBeNull] Action<ContainerBuilder> configureContainer = null)
        {
            configurator.Service<WebApiService>(c =>
            {
                c.ConstructUsing(settings =>
                {
                    var containerBuilder = new ContainerBuilder();
                    containerBuilder.Register(context => settings).SingleInstance();
                    containerBuilder.RegisterModule<WebApiAutofacModule>();
                    configureContainer?.Invoke(containerBuilder);
                    var container = containerBuilder.Build();
                    return container.Resolve<WebApiService>();
                });
                c.WhenStarted(svc => svc.Start());
                c.WhenStopped(svc => svc.Stop());
            });
            return configurator;
        }
    }
}