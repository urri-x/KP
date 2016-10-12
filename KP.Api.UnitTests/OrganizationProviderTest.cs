using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using KP.Service;
using KP.Service.Requisites;
using KP.Storage;
using KP.Storage.Entities;
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
            var dateBegin = DateTime.Today;
            var firstEntity = new ObjectEntity() {DateBegin = dateBegin, DateEnd = dateBegin.AddDays(10), Id = ObjectId.GenerateNewId()};
            var secondEntity = new ObjectEntity() {DateBegin = dateBegin.AddDays(1), DateEnd = null, Id = ObjectId.GenerateNewId()};
            var shortnameEntities = new List<ShortNameEntity>()
            {
                new ShortNameEntity() {ObjectId = firstEntity.Id, DateBegin = firstEntity.DateBegin, Value = "old"},
                new ShortNameEntity() {ObjectId = firstEntity.Id, DateBegin = firstEntity.DateBegin.AddDays(1), Value = "new"},
                new ShortNameEntity() {ObjectId = secondEntity.Id, DateBegin = secondEntity.DateBegin, Value = "one"}
            };
            
            repository.GetAll<ObjectEntity>().Returns(new List<ObjectEntity>() {firstEntity,secondEntity});
            repository.GetAll<ShortNameEntity>().Returns(shortnameEntities);

            var organizationProvider = new OrganizationProvider(repository);
            var organizations = organizationProvider.GetAll().Result.ToList();
            var expectedOrganizations = new List<Organization>()
            {
                new Organization() {DateBegin = firstEntity.DateBegin, Id = firstEntity.Id, DateEnd = firstEntity.DateEnd},   
                new Organization() {DateBegin = secondEntity.DateBegin, Id = secondEntity.Id, DateEnd = secondEntity.DateEnd}    
            };
            organizations.ShouldBeEquivalentTo(expectedOrganizations, options=>options.ExcludingNestedObjects());
        }
    }
}
