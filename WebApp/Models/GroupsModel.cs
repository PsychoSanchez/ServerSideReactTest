using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public partial class GroupsModel
    {
        public int GroupID { get; set; }
        [Display(Name = "Название")]
        public string GroupName { get; set; }
        [Display(Name = "Преподаватель")]
        public string TutorName { get; set; }
        [Display(Name = "Количество студентов")]
        public Nullable<int> StudentsCount { get; set; }
    }

    public partial class AddGroupModel
    {
        public string GroupName { get; set; }
        public int TutorID { get; set; }
    }
}