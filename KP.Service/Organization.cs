using System;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text;
using JetBrains.Annotations;
using KP.Service.Requisites;
using MongoDB.Bson;

namespace KP.Service
{
    public class Organization
    {
        [NotNull]
        public ObjectId Id { get; set; }

        [NotNull]
        [DisplayName("Дата ввода в штатное расписание")]
        public DateTime DateBegin { get; set; }

        [CanBeNull]
        [DisplayName("Дата расформирования")]
        public DateTime? DateEnd { get; set; }

        [NotNull]
        public DynamicRequisitesProvider<ShortName> ShortName;
    }
}
