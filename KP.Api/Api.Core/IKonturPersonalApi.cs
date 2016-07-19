using System.Linq;
using Kontur.Forms.Api.AppObjects;

namespace Kontur.Forms.Api.Core
{
    public interface IKonturPersonalApi
    {
        IQueryable<AppObject> GetAppObjects(int objectType);
    }
}