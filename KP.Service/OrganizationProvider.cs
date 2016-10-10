using System.Collections.Generic;
using System.Threading.Tasks;
using KP.Storage;

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
            var result = await repository.GetAll<Organization>();
            return result;
        }
    }
}