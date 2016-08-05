using System.Data.Entity;
using System.Linq;
using KP.ApiContract;

namespace KP.Data.Repository
{
    public class Repository<T> : IRepository<T> where T : class 
    {
        private readonly DbContext context;
        private IDbSet<T> entities;

        public Repository(DbContext context)
        {
            this.context = context;
        }

        public T GetById(object id)
        {
            return this.Entities.Find(id);
        }

        public void Insert(T entity)
        {
            this.Entities.Add(entity);
        }

        public void Delete(T entity)
        {
            this.Entities.Remove(entity);
        }

        public IQueryable<T> Table => this.Entities;

        private IDbSet<T> Entities => entities ?? (entities = context.Set<T>());
    }
}