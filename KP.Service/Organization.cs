using System;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using JetBrains.Annotations;
using MongoDB.Bson;

namespace KP.Service
{
    public class Organization
    {
        public ObjectId Id;
        public DateTime DateBegin;
        [CanBeNull]
        public DateTime? DateEnd;
    }
}
