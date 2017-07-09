using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public partial class TutorsModel
    {
        public int TutorID { get; set; }
        [Display(Name = "Преподаватель")]
        public string Name { get; set; }
    }
}