using System;

namespace KP.Storage.Domain
{
    public class StaffOrganization : StaffObject
    {
        public override StaffObjectType Type => StaffObjectType.StaffOrganization;

        public StaffOrganization(DateTime begin, DateTime? end = null) : base(begin, end)
        {
        }
    }
}