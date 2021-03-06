﻿using System.Web.Http.Dependencies;
using Autofac;
using Autofac.Integration.WebApi;
using KP2.Api.Core.DI;

namespace KP2.Api.DI
{
    public class WebApiAutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterNonControllers(ThisAssembly)
                .AsImplementedInterfaces()
                .AsSelf()
                .SingleInstance();
            builder.RegisterControllers(ThisAssembly);
            builder.RegisterType<AutofacWebApiDependencyResolver>().As<IDependencyResolver>().SingleInstance();
        }
    }
}