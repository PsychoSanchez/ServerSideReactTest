using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class GroupsController : Controller
    {
        private StudyEntities db = new StudyEntities();

        // GET: Groups
        public ActionResult Index()
        {
            var groups = db.Database.SqlQuery<GroupsModel>("EXEC GetGroups").ToList();
            return View(groups.ToList());
        }

        // GET: Groups/Create
        public ActionResult Create()
        {
            return View();
        }

        [OutputCache(Location = OutputCacheLocation.None)]
        public ActionResult GetTutors()
        {
            var tutors = db.Database.SqlQuery<TutorsModel>("EXEC GetTutors").ToList();
            return Json(tutors, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddGroup(AddGroupModel model)
        {
            var tutors = db.Database.SqlQuery<TutorsModel>("EXEC GetTutors").ToList();
            return Json(tutors, JsonRequestBehavior.AllowGet);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
