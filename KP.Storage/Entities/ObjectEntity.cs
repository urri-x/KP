using System;
using JetBrains.Annotations;
using MongoDB.Bson;

namespace KP.Storage.Entities
{
    public class ObjectEntity:BaseEnity
    {
        [NotNull]
        public DateTime DateBegin;
        [CanBeNull]
        public DateTime? DateEnd;
    }

    public abstract class BaseEnity
    {
        [NotNull]
        public ObjectId Id;
    }
}