using System.Linq;

namespace KP.ApiContract
{
    public interface IRepository<T> where T : class 
    {
        T GetById(object id);
        void Insert(T entity);
        void Delete(T entity);
        IQueryable<T> Table { get; }
    }
}