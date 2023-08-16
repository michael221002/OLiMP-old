using System;
using System.Collections.Generic;

namespace webapi.models
{
    public class EmployeeChange
    {
        public int Id { get; set; }
        public int EmployeeNumber { get; set; }
        public string KeyName { get; set; }
        public string OldKey { get; set; }
        public string NewKey { get; set; }
        public string ChangeDate { get; set; }

        // Optional: Navigation Property für Employee (falls benötigt)
        // public virtual Employee Employee { get; set; }
    }
}