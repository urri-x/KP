using System.Linq;
using Kontur.Forms.Api.AppObjects;

namespace Kontur.Forms.Api.Core
{
    public class KonturPersonalApi : IKonturPersonalApi
    {
        public IQueryable<AppObject> GetAppObjects(int objectType)
        {
            throw new System.NotImplementedException();
        }
    }
}