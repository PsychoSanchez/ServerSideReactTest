using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Text;
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

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return RedirectToAction("Index");
            }
            var data = db.Database.SqlQuery<GetGroupsDataModel>("EXEC GetStudentGroupData @p0", id).ToList();
            if (data == null)
            {
                return RedirectPermanent("Index");
            }
            ViewBag.GroupId = id;
            ViewBag.GroupInfo = db.Database.SqlQuery<GroupDataModel>("EXEC GetGroupData @p0", id).Single();
            return View(data.ToList());
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
            try
            {
                var query = new StringBuilder("EXEC CreateGroup @tutorID = ")
                .Append(model.TutorID)
                .Append(", @groupName = '")
                .Append(model.GroupName)
                .Append("';");
                db.Database.ExecuteSqlCommand(query.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // throw;
            }
            return RedirectToAction("Index");
        }
        [HttpPost]
        public ActionResult EditGroup(GroupDataModel model)
        {
            try
            {
                var query = new StringBuilder("EXEC EditGroup @id = ")
                .Append(model.GroupID)
                .Append(", @name = '")
                .Append(model.GroupName)
                .Append("';");
                db.Database.ExecuteSqlCommand(query.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                // throw;
            }
            return RedirectToAction("Index");
        }

        public ActionResult AddStudentToGroup(int? groupId)
        {
            if (groupId == null)
            {
                return RedirectToAction("Index");
            }
            ViewBag.GroupId = groupId;
            // Get group info (it could have benn updated)
            ViewBag.GroupInfo = db.Database.SqlQuery<GroupDataModel>("EXEC GetGroupData @p0", groupId).Single();
            var model = new OrganisationsWorkersModel()
            {
                Organisations = db.Database.SqlQuery<OrganisationModel>("EXEC GetOrganisations").ToList(),
                Workers = db.Database.SqlQuery<WorkerModel>("EXEC GetWorkers").ToList()
            };
            return View(model);
        }

        [HttpPost]
        public JsonResult AddStudent(AddStudentModel data)
        {
            var students = db.Database.SqlQuery<GetGroupsDataModel>("EXEC GetStudentGroupData @p0", data.GroupID).ToList();
            var student = students.Find(x => x.WorkerID == data.WorkerID);
            string result = "Exist";
            if (student == null)
            {
                try
                {
                    var query = new StringBuilder("EXEC AddStudent @workerId = ")
                        .Append(data.WorkerID)
                        .Append(", @groupId = ")
                        .Append(data.GroupID)
                        .Append(";");
                    db.Database.ExecuteSqlCommand(query.ToString());
                    result = "Added";
                }
                catch (Exception)
                {
                    result = "Database Failure";
                }
                
            }
            return Json(new { result = result });
        }
        
        /// <summary>
        /// Хорошо было бы сделать модальное окно с вопросом
        /// Который вызывает JsonResult Post метод
        /// И обновляет вьюху без перезагрузки страницы
        /// Но мне лень...
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult RemoveStudent (int? id)
        {
            // var result = "Wrong id";
            if (id != null)
            {
                db.Database.ExecuteSqlCommand("EXEC RemoveStudentFromGroup @id = " + id + ";");
                // result = "Success";
            }
            return RedirectToAction("Index");
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
