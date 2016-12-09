using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using FluentAssertions.Common;
using KP.FunctionalTests.Context;
using KP.Storage.Domain;
using NUnit.Framework;

namespace KP.FunctionalTests
{
    public class StaffContextTest
    {
        [Test]
        public void Create_Organization_With_ShortName()
        {
            using (var db = new StaffContextForTests("name=TestContext"))
            {
                var newOrganization = db.StaffObjects.Add(new StaffOrganization(DateTime.Parse("01.01.2016")));
                var shortName = new StaffObjectShortName(DateTime.Parse("01.01.2016"), "ООО Рога и Копыта", newOrganization);
                db.StaffShortNames.Add(shortName);

                db.SaveChanges();
                var savedOrganization = db.StaffObjects.Find(newOrganization.Id);
                Assert.That(savedOrganization.ShortNames.Single().IsSameOrEqualTo(shortName));
            }
        }

        [Test]
        public void Create_Organization_With_Many_ShortNames()
        {
            using (var db = new StaffContextForTests("name=TestContext"))
            {
                var newOrganization = db.StaffObjects.Add(new StaffOrganization(DateTime.Parse("01.01.2016")));
                var shortNames = new List<StaffObjectShortName>()
                {
                    new StaffObjectShortName(DateTime.Parse("01.01.2015"), "ООО Рога и Копыта", newOrganization),
                    new StaffObjectShortName(DateTime.Parse("01.01.2016"), "ООО Легион", newOrganization)
                };
                db.StaffShortNames.AddRange(shortNames);

                db.SaveChanges();
                var savedOrganization = db.StaffObjects.Find(newOrganization.Id);

                Assert.That(savedOrganization.ShortNames.SequenceEqual(shortNames));
            }
        }
        [Test]
        public void Create_ManyOrganizations_With_ShortName()
        {
            using (var db = new StaffContextForTests("name=TestContext"))
            {
                var firstOrganization = db.StaffObjects.Add(new StaffOrganization(DateTime.Parse("01.01.2015")));
                var secondOrganization = db.StaffObjects.Add(new StaffOrganization(DateTime.Parse("01.01.2016")));
                var firstShortName = new StaffObjectShortName(DateTime.Parse("01.01.2015"), "ООО Рога и Копыта", firstOrganization);
                var secondShortName = new StaffObjectShortName(DateTime.Parse("01.01.2015"), "ООО Рога и Копыта", secondOrganization);
                db.StaffShortNames.AddRange(new List<StaffObjectShortName>()
                {
                    firstShortName,
                    secondShortName
                });

                db.SaveChanges();
                var savedFirstOrganization = db.StaffObjects.Find(firstOrganization.Id);
                var savedSecondOrganization = db.StaffObjects.Find(secondOrganization.Id);

                Assert.That(savedFirstOrganization.ShortNames.Single().IsSameOrEqualTo(firstShortName));
                Assert.That(savedSecondOrganization.ShortNames.Single().IsSameOrEqualTo(secondShortName));
            }
        }
        [Test]
        public void Create_ManyOrganizations_With_ManyShortNames()
        {
            using (var db = new StaffContextForTests("name=TestContext"))
            {
                var firstOrganization = db.StaffObjects.Add(new StaffOrganization(DateTime.Parse("01.01.2015")));
                var secondOrganization = db.StaffObjects.Add(new StaffOrganization(DateTime.Parse("01.01.2016")));
                var firstShortNames = new List<StaffObjectShortName>()
                {
                    new StaffObjectShortName(DateTime.Parse("01.01.2015"), "ООО Рога и Копыта", firstOrganization),
                    new StaffObjectShortName(DateTime.Parse("01.01.2016"), "ООО Легион", firstOrganization)
                };
                var secondShortNames = new List<StaffObjectShortName>()
                {
                    new StaffObjectShortName(DateTime.Parse("01.01.2015"), "ЗАО Рога и Копыта", secondOrganization),
                    new StaffObjectShortName(DateTime.Parse("01.01.2016"), "ЗАО Легион", secondOrganization)
                };
                db.StaffShortNames.AddRange(firstShortNames.Concat(secondShortNames) );

                db.SaveChanges();
                var savedFirstOrganization = db.StaffObjects.Find(firstOrganization.Id);
                var savedSecondOrganization = db.StaffObjects.Find(secondOrganization.Id);

                Assert.That(savedFirstOrganization.ShortNames.SequenceEqual(firstShortNames));
                Assert.That(savedSecondOrganization.ShortNames.SequenceEqual(secondShortNames));
            }
        }
    }
}