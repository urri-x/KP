using System;
using System.Collections.Generic;
using System.Linq;

namespace KP.Service.Requisites
{
    public  class DynamicRequisitesProvider<T> : IDynamicRequisitesProvider<T> where T : DynamicRequisite
    {
        private readonly IOrderedEnumerable<T> records;

        public DynamicRequisitesProvider(IEnumerable<T> records)
        {
            this.records = records.OrderByDescending(x=>x.DateBegin);
        }

        public T GetOneOnDate(DateTime date)
        {
            throw new NotImplementedException();
        }

        public IOrderedEnumerable<T> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}