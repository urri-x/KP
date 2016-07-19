using System;
using System.Collections.Generic;
using System.Net;
using JetBrains.Annotations;

namespace KP2.Api.Exceptions
{
    public class ApiException : Exception
    {
        public const string MarkerHeaderName = "X-Exception-Type";
        public const string MarkerHeaderValue = nameof(ApiException);

        public ApiException(HttpStatusCode httpStatusCode, [NotNull] string errorCode, [NotNull] string userMessage, [CanBeNull] string systemMessage = null, [CanBeNull] Exception innerException = null)
            : base($"{errorCode}: {userMessage}{(string.IsNullOrEmpty(systemMessage) ? "" : $". {systemMessage}")}", innerException)
        {
            HttpStatusCode = httpStatusCode;
            ErrorCode = errorCode;
            UserMessage = userMessage;
            SystemMessage = systemMessage;
        }

        public HttpStatusCode HttpStatusCode { get; }

        [NotNull]
        public string ErrorCode { get; }

        [NotNull]
        public string UserMessage { get; }

        [CanBeNull]
        public string SystemMessage { get; }

        [CanBeNull]
        public Dictionary<string, string> Properties { get; set; }
    }
}