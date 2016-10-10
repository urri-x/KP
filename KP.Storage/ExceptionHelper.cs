using System;
using System.Diagnostics;
using System.Text;

namespace KP.Storage
{
    public static class ExceptiionHelper
    {

        public static string NotifyException(string functionName, string context, Exception ex)
        {
            string source = functionName + ": " + context;
            source = GetAllInformation(ex, source);
            Debug.WriteLine(source);
            return source;
        }

        public static string GetAllInformation(Exception exception, string source)
        {

            var sb = new StringBuilder();
            sb.AppendLine("********** " + DateTime.Now.ToLongDateString() + "**********");

            while (exception != null)
            {
                sb.AppendLine("Inner Exception Type: ");
                if (exception.InnerException != null)
                {
                    sb.AppendLine(exception.InnerException.GetType().ToString());
                    sb.AppendLine("Inner Exception: ");
                    sb.AppendLine(exception.InnerException.Message);
                    sb.AppendLine("Inner Source: ");
                    sb.AppendLine(exception.InnerException.Source);
                    if (exception.InnerException.StackTrace != null)
                    {
                        sb.AppendLine("Inner Stack Trace: ");
                        sb.AppendLine(exception.InnerException.StackTrace);
                    }
                    sb.AppendLine("Exception Type: ");
                    sb.AppendLine(sb.GetType().ToString());
                    sb.AppendLine("Exception: " + exception.Message);
                    sb.AppendLine("Source: " + source);
                    sb.AppendLine("Stack Trace: ");
                    if (exception.StackTrace != null)
                    {
                        sb.AppendLine(exception.StackTrace);
                        sb.AppendLine();
                    }
                    exception = exception.InnerException;
                }
            }
            return sb.ToString();
        }

    }
}