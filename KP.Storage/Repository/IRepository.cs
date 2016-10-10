using System.Collections.Generic;
using System.Threading.Tasks;
using KP.Storage.Repository;

namespace KP.Storage
{
    public interface IRepository
    {
        Task<IEnumerable<TEntity>> GetAll<TEntity>() where TEntity : class, new();
        Task Insert<TEntity>(TEntity item) where TEntity : class, new();
    }
}
