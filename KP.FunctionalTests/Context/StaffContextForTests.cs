using System.Data.Entity;
using KP.Storage.Domain;
using KP.Storage.Domain.Context;

namespace KP.FunctionalTests.Context
{
    public class StaffContextForTests : StaffContext
    {
        public StaffContextForTests(string nameOrConnectionString) : base(nameOrConnectionString)
        {
            Database.SetInitializer(new DropCreateDatabaseAlways<StaffContextForTests>());
        }
    }
}