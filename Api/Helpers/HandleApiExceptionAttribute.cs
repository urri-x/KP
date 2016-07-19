using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http.Filters;
using JetBrains.Annotations;
using KP2.Api.Exceptions;


namespace KP2.Api.Helpers
{
    public class HandleApiExceptionAttribute : ExceptionFilterAttribute
	{
		public override void OnException([NotNull] HttpActionExecutedContext context)
		{
			var apiException = context.Exception as ApiException;
			if (apiException == null)
			{
				//var log = context.Request.GetService<ILog>();
				//log.Error($"Unexpected exception in {context.Request.RequestUri.AbsoluteUri}", context.Exception);
				base.OnException(context);
				return;
			}
			context.Response = context.Request.CreateResponse(apiException.HttpStatusCode, new ExceptionResponse
			{
				ErrorCode = apiException.ErrorCode,
				Message = apiException.UserMessage,
				Properties = apiException.Properties,
				// todo не показывать пользователю подробности об исключении
				SystemMessage = apiException.SystemMessage,
				Exception = apiException.ToString()
			});
			context.Response.ReasonPhrase = null;
			context.Response.Headers.Add(ApiException.MarkerHeaderName, ApiException.MarkerHeaderValue);
		}

		private class ExceptionResponse
		{
			public string ErrorCode { get; set; }
			public string Message { get; set; }
			public string SystemMessage { get; set; }
			public string Exception { get; set; }
			public Dictionary<string, string> Properties { get; set; }
		}
	}
}