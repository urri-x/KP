using System.Collections.Generic;
using System.Threading.Tasks;

namespace KP.Service
{
    interface IOrganizationProvider
    {
        Task<IEnumerable<Organization>> GetAll();
    }
}