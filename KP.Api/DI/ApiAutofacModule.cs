using Autofac;
using JetBrains.Annotations;
using KP2.Api.Core.DI;

namespace KP.Api.DI
{
    public class ApiAutofacModule : Module
    {
        protected override void Load([NotNull] ContainerBuilder builder)
        {
            builder.RegisterControllers(ThisAssembly);
            builder.RegisterNonControllers(ThisAssembly)
                .AsImplementedInterfaces()
                .AsSelf()
                .SingleInstance();
        }
    }
}