using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace angah.API.v1
{
    public class SearchController : ApiController
    {
        public object Get()
        {
            var res = new
            {
                assets = new List<object>()
                {
                    new {id = 1, text = "HY-IOP"},
                    new {id = 3, text = "AY-IOP"},
                    new {id = 4, text = "BY-IOP"},
                    new {id = 5, text = "CY-IOP"},
                    new {id = 6, text = "CA-IOP"},
                    new {id = 7, text = "CB-AAA"},
                },
                docs = new List<object>()
                {
                    new { id = 2, text = "work" },
                    new { id = 4, text = "work32" },
                    new { id = 5, text = "work332" }
                }
            };

            return res;
        }
    }
}
