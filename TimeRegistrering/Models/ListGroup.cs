using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeRegistrering.Models
{
    public class ListGroup
    {
        //private TimeRegistration[] timeRegistrationsByYear;
        public ListGroup(int groupKey, TimeRegistration[] timeRegistrationsByYear)
        {
            GroupKey = groupKey;
            TimeRegistrationsByYear = timeRegistrationsByYear;
        }
        public int GroupKey { get; set; }
        public TimeRegistration[] TimeRegistrationsByYear { get; set; }

    }
}
