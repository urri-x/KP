using System.Collections.Generic;

namespace KP.Storage.Repository
{
    public class GetManyResult<TEntity> : Result where TEntity : class, new()
    {
        public IEnumerable<TEntity> Entities { get; set; }
    }
}