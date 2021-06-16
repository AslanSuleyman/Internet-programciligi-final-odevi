using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication3.Models;
using WebApplication3.ViewModel;

namespace WebApplication3.Auth
{
    public class UyeService
    {

        DB01Entities2 db = new DB01Entities2();

        public UserModel UyeOturumAc(string mail, string parola)
        {
            var items = db.User.ToArray();
            UserModel uye = items.Where(s => s.userMail == mail && s.userPassword == parola).Select(x => new UserModel()
            {
                userID = x.userID,
                userName = x.userName,
                userMail = x.userMail,
                userPassword = x.userPassword,
                userPhoto = x.userPhoto,
                userAdmin = (int)x.userAdmin
            }).SingleOrDefault();
            
           
            return uye;
        }

    }
}