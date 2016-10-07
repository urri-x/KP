using System;
using System.IO;
using JetBrains.Annotations;

namespace KP.WebApi.Core.Helpers
{
	public class ServerPathProvider : IServerPathProvider
	{
		[CanBeNull]
		public string MapPath([NotNull] string virtualPath)
		{
			var relativePath = virtualPath.StartsWith("~/") ? virtualPath.Substring(2) : virtualPath;
			return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, relativePath);
		}
	}
}