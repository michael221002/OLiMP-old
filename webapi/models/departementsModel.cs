﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace webapi.models
{
    public class departementsModel
    {
        public int Id { get; set; }
        public Guid GUID { get; set; }
        public string department { get; set; }
    }
}
