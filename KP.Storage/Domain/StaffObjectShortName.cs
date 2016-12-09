using System;
using System.ComponentModel.DataAnnotations;

namespace KP.Storage.Domain
{
    public class StaffObjectShortName
    {
        public StaffObjectShortName(DateTime begin, string value, StaffObject staffObject)
        {
            StaffObject = staffObject;
            Begin = begin;
            Value = value;
        }

        public StaffObjectShortName(DateTime begin, string value, int staffObjectId)
        {
            StaffObjectId = staffObjectId;
            Begin = begin;
            Value = value;
        }

        public int Id { get; set; }

        public int StaffObjectId { get; set; }
        public StaffObject StaffObject { get; set; }

        public DateTime Begin { get; set; }
        public string Value { get; set; }
    }
}