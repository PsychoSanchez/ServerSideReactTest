using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "GroupsController", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "GetTutors",
                url: "GetTutors",
                defaults: new { controller = "GroupsController", action = "GetTutors" }
            );

            routes.MapRoute(
               name: "AddGroup",
               url: "AddGroup",
               defaults: new { controller = "GroupsController", action = "AddTutors" }
           );
        }
    }
}
