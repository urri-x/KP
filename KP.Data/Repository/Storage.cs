using System;
using System.Collections.Generic;
using System.Linq;
using KP.ApiContract;
using KP.Data.DataClasses;

namespace KP.Data.Repository
{
    public class Storage : IStorage
    {
        private readonly KPContext context;
        
        private bool disposed;
        private Dictionary<string, object> repositories;

        public Storage(KPContext context)
        {
            this.context = context;
        }

        public IQueryable<T> Table<T>() where T : class
        {
            return Repository<T>().Table;
        }

        public void Save()
        {
            context.SaveChanges();
        }


        public IRepository<T> Repository<T>() where T : class
        {
            if (repositories == null)
                repositories = new Dictionary<string, object>();

            var type = typeof(T).Name;

            if (!repositories.ContainsKey(type))
            {
                var repositoryType = typeof(Repository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), context);
                repositories.Add(type, repositoryInstance);
            }
            return (IRepository<T>)repositories[type];
        }


        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            disposed = true;
        }
    }
}