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

    public partial class GetGroupsDataModel
    {
        public int DataRecordID { get; set; }
        public int WorkerID { get; set; }
        public string GroupName { get; set; }
        [Display(Name = "Студент")]
        public string WorkerName { get; set; }
        public string TutorName { get; set; }
        [Display(Name = "Организация")]
        public string OrganisationName { get; set; }
    }

    public partial class GroupDataModel
    {
        public int GroupID { get; set; }
        public string GroupName { get; set; }
        public string TutorName { get; set; }
    }

    public partial class AddStudentModel
    {
        public int GroupID { get; set; }
        public int WorkerID { get; set; }
    }
}