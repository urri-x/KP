using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using JetBrains.Annotations;

namespace KP.WebApi.Core.Helpers
{
    public static class ExternalUrlHttpRequestMessageExtensions
    {
        private const string ExternalUrl = "X-ExternalUrl";

        [NotNull]
        public static string GetExternalUrl([NotNull] this HttpRequestMessage request)
        {
            object value;
            if (request.Properties.TryGetValue(ExternalUrl, out value))
                return (string)value;
            var externalUrl = FindExternalUrlInHeaders(request) ?? GetExternalUrlFromContext(request);
            externalUrl += externalUrl.EndsWith("/") ? "" : "/";
            request.Properties[ExternalUrl] = externalUrl;
            return externalUrl;
        }

        [NotNull]
        public static string BuildExternalUrl([NotNull] this HttpRequestMessage request, [CanBeNull] string relativeUrl)
        {
            var url = request.GetExternalUrl();
            if (!string.IsNullOrEmpty(relativeUrl))
            {
                if (relativeUrl.StartsWith("/"))
                    relativeUrl = relativeUrl.Substring(1);
                url += relativeUrl;
            }
            return url;
        }

        [CanBeNull]
        public static string FindExternalUrlInHeaders([NotNull] HttpRequestMessage request)
        {
            IEnumerable<string> values;
            if (!request.Headers.TryGetValues("X-Scheme", out values))
                return null;
            var scheme = values.FirstOrDefault();
            if (string.IsNullOrWhiteSpace(scheme))
                return null;
            if (string.IsNullOrWhiteSpace(request.Headers.Host))
                return null;
            return AddVirtualPathRoot(request, $"{scheme}://{request.Headers.Host}/");
        }

        [NotNull]
        public static string GetExternalUrlFromContext([NotNull] HttpRequestMessage request)
        {
            var externalUrlBase = request.RequestUri.GetLeftPart(UriPartial.Authority);
            return AddVirtualPathRoot(request, externalUrlBase);
        }

        [NotNull]
        public static string AddVirtualPathRoot([NotNull] HttpRequestMessage request, [NotNull] string externalUrlBase)
        {
            var relativeUri = request.GetService<IExternalUrlInfo>().AppPrefix;
            if (string.IsNullOrEmpty(relativeUri))
                return externalUrlBase;
            var baseUri = new Uri(externalUrlBase);
            return new Uri(baseUri, relativeUri).AbsoluteUri;
        }
    }
}