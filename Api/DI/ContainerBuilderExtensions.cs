using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Builder;
using Autofac.Features.Scanning;
using JetBrains.Annotations;

namespace KP2.Api.DI
{
    public static class ContainerBuilderExtensions
    {
        [NotNull]
        public static IRegistrationBuilder<object, ScanningActivatorData, DynamicRegistrationStyle> RegisterControllers([NotNull] this ContainerBuilder builder, [NotNull] params Assembly[] assemblies)
        {
            return builder.RegisterAssemblyTypes(assemblies)
                .Where(t => typeof(ApiController).IsAssignableFrom(t))
                .AsSelf()
                .InstancePerDependency();
        }

        [NotNull]
        public static IRegistrationBuilder<object, ScanningActivatorData, DynamicRegistrationStyle> RegisterNonControllers([NotNull] this ContainerBuilder builder, [NotNull] params Assembly[] assemblies)
        {
            return builder.RegisterAssemblyTypes(assemblies)
                .Where(t => !typeof(ApiController).IsAssignableFrom(t));
        }
    }
}