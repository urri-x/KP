using System;
using JetBrains.Annotations;
using MongoDB.Bson;

namespace KP.Storage.Entities
{
    public class ShortNameEntity:BaseEnity
    {
        [NotNull]
        public ObjectId ObjectId;
        public DateTime DateBegin;
        public string Value;

    }
}