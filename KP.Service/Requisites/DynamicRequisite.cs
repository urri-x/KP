using System;
using JetBrains.Annotations;
using MongoDB.Bson;

namespace KP.Service.Requisites
{
    public abstract class DynamicRequisite
    {
        [NotNull]
        public DateTime DateBegin;
        [NotNull]
        private ObjectId Id;
    }
}