using System;
using System.Linq;
using KP.ApiContract;
using KP.Data.DataClasses;
using KP.Service.BusinessObjects;

namespace KP.Service
{
    public class Orders
    {
        private IStorage storage { get; set; }

        public Orders(IStorage storage)
        {
            this.storage = storage;
        }

        public IQueryable<Order> GetMainData()
        {
            var orders = from o in storage.Table<JRN_Orders>()
                         join s in storage.Table<ASysStoreItems>() on o.id_OrderType equals s.id
                         join item in storage.Table<REC_View_StoreItem>() on s.ItemName equals item.ItemName
                         join r in storage.Table<REF>() on item.id1 equals r.ID
                         select new Order()
                         {
                             Id = o.id,
                             Number = o.number,
                             Type = r.ShortName,
                             Code = r.Code,
                             Status = o.status,
                             CreateDate = o.date_begin.GetValueOrDefault(),
                             AcceptDate = o.AcceptDate.GetValueOrDefault(),
                             Description = o.Note,
                             LastModifiedByUser = o.LastModifiedUser,
                         };
            return  orders;
        }

    }
}