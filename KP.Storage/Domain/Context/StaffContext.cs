using System.Data.Entity;

namespace KP.Storage.Domain.Context
{
    public class StaffContext : DbContext
    {
        public StaffContext(string nameOrConnectionString) : base(nameOrConnectionString) { }
        public StaffContext() : base("name=StaffEntities")
        {
        }
        public DbSet<StaffObject> StaffObjects { get; set; }
        public DbSet<StaffObjectShortName> StaffShortNames { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // PostgreSQL uses the public schema by default - not dbo.
            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }
    }
}