using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using KP.Service;
using KP.Storage;
using KP.Storage.Repository;
using MongoDB.Bson;
using NSubstitute;
using NUnit.Framework;

namespace KP.UnitTests
{
    [TestFixture]
    class OrganizationProviderTest
    {
        [Test]
        public void GetAll_Returns_All()
        {
            var repository = Substitute.For<IRepository>();
            var allResult = new List<Organization>()
            {
                new Organization() {DateBegin = DateTime.Today, DateEnd = null, Id = ObjectId.GenerateNewId()},
                new Organization() {DateBegin = DateTime.Today.AddDays(1), DateEnd = null, Id = ObjectId.GenerateNewId()}
            };
            repository.GetAll<Organization>().Returns(allResult);
            var organizationProvider = new OrganizationProvider(repository);
            var organizations = organizationProvider.GetAll().Result.ToList();
            organizations.Count.Should().Be(2);
        }
    }
}
