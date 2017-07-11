using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public partial class OrganisationModel
    {
        public int OrganisationID { get; set; }
        [Display(Name = "Организация")]
        public string OrganisationName { get; set; }
    }
    public partial class WorkerModel
    {
        public int OrganisationID { get; set; }
        public int WorkerID { get; set; }
        [Display(Name = "Сотрудник")]
        public string WorkerName { get; set; }
    }

    public partial class OrganisationsWorkersModel
    {
        [Range(0, int.MaxValue)]
        public int OrganisationID { get; set; }
        [Range(0, int.MaxValue)]
        public int WorkerID { get; set; }
        public IEnumerable<OrganisationModel> Organisations { get; set; }
        public IEnumerable<WorkerModel> Workers { get; set; }
    }

}