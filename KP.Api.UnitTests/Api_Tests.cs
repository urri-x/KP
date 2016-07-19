using System;
using Kontur.Forms.Api.Core;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests
{
    [TestClass]
    public class Api_Tests
    {
        [TestMethod]
        public void GetAppObjects_Returns()
        {
            var api = new KonturPersonalApi();
            api.GetAppObjects(5);
        }
    }
}
