using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KP.Service.Requisites;
using KP.Storage;
using KP.Storage.Entities;

namespace KP.Service
{
    public class OrganizationProvider : IOrganizationProvider
    {
        private readonly IRepository repository;

        public OrganizationProvider(IRepository repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<Organization>> GetAll()
        {
            var staffObjects = await repository.GetAll<ObjectEntity>();
            var shortNames = await repository.GetAll<ShortNameEntity>();

            var organizations = staffObjects.Select(o => new Organization()
            {
                DateBegin = o.DateBegin,
                DateEnd = o.DateEnd,
                Id = o.Id,
                ShortName = new DynamicRequisitesProvider<ShortName>(
                    shortNames
                    .Where(s=>s.ObjectId.Equals(o.Id))
                    .Select(s=>new ShortName()))
            });
            return organizations;

        }
    }

}