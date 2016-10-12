using JetBrains.Annotations;
using MongoDB.Bson;

namespace KP.Storage.Entities
{
    public abstract class BaseEnity
    {
        [NotNull]
        public ObjectId Id;
    }
}