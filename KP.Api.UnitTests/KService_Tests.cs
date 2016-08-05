using KP.ApiContract;
using KP.Service;
using KP.Service.BusinessObjects;
using NSubstitute;
using NUnit.Framework;

namespace Api.UnitTests
{
    [TestFixture]
    public class KService_Tests
    {
        private IStorage storage;
        [SetUp]
        public void SetUp()
        {
            
            storage = Substitute.For<IStorage>();
        }
    }
}