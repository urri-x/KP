using System;
using System.Linq;

namespace KP.ApiContract
{
    public interface IStorage : IDisposable
    {
        IRepository<T> Repository<T>() where T:class;
        IQueryable<T> Table<T>() where T : class;
        void Save();
    }
}