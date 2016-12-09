using System;
using System.Collections.Generic;
using System.Linq;

namespace KP.Storage.Domain
{
    public enum StaffObjectType
    {
        StaffHolding = 1,
        StaffOrganization = 2,
        StaffDepartment = 3,
        StaffPosition = 4,
        StaffEmployee = 5
    }

    public abstract class StaffObject
    {

        protected StaffObject(DateTime begin, DateTime? end=null)
        {
            this.Begin = begin;
            this.End = end;
        }
        public int Id { get; set; }
        public DateTime Begin { get; set; }
        public DateTime? End { get; set; }
        public abstract StaffObjectType Type { get; }
        public virtual ICollection<StaffObjectShortName> ShortNames { get; set; }
    }
}
