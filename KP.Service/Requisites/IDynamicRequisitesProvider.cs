using System;
using System.Linq;

namespace KP.Service.Requisites
{
    public interface IDynamicRequisitesProvider<T> where T:DynamicRequisite
    {
        T GetOneOnDate(DateTime date);
        IOrderedEnumerable<T> GetAll();
    }
}