using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.ViewModel
{
    public class UserModel
    {
        public string userID { get; set; }
        public string userName { get; set; }

        public string userPassword { get; set; }

        public string userMail { get; set; }
        public int ?userAdmin { get; set; }
        public string userPhoto { get; set; }
       

    }
}