using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using JetBrains.Annotations;

namespace KP.WebApi.Core.Helpers
{
    public static class HttpRequestMessageExtensions
    {
        private const string RequestTimeout = "RequestTimeout";

        public static TimeSpan? GetRequestTimeout([NotNull] this HttpRequestMessage request)
        {
            IEnumerable<string> values;
            if (!request.Headers.TryGetValues(RequestTimeout, out values))
                return null;
            var value = values.FirstOrDefault();
            if (string.IsNullOrWhiteSpace(value))
                return null;
            long ticks;
            if (!long.TryParse(value, out ticks))
                return null;
            return TimeSpan.FromTicks(ticks);
        }

        [CanBeNull]
        public static string FindActionName([NotNull] this HttpRequestMessage request)
        {
            var actionDescriptor = request.GetActionDescriptor();
            return actionDescriptor != null
                ? $"{actionDescriptor.ControllerDescriptor.ControllerName}/{actionDescriptor.ActionName}"
                : null;
        }

        [NotNull]
        public static T GetService<T>([NotNull] this HttpRequestMessage request)
        {
            var dependencyResolver = request.GetConfiguration().DependencyResolver;
            var result = (T)dependencyResolver.GetService(typeof(T));
            if (result == null)
                throw new InvalidOperationException($"Service '{typeof(T)}' is not registered");
            return result;
        }
    }
}