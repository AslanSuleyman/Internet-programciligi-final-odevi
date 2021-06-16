using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication3.Models;
using WebApplication3.ViewModel;
namespace WebApplication3.Controllers
{
    [Authorize]
    public class WebServiceController : ApiController
    {
        DB01Entities2 db= new DB01Entities2();
        SonucModel sonuc = new SonucModel();

        #region User
        [HttpGet]
        [Route("api/userlist")]
        public List<UserModel> UserList()
        {
            List<UserModel> list = db.User.Select(data => new UserModel()
            {
                userID = data.userID,
                userName = data.userName,
                userMail = data.userMail,
                userPhoto = data.userPhoto,
                userPassword = data.userPassword,
                userAdmin = (int)data.userAdmin,
            }).ToList();

            return list;
        }

        [HttpGet]
        [Route("api/userbyid/{userID}")]
        public UserModel UserByID(string userID)
        {
            UserModel kayit = db.User.Where(s => s.userID == userID).Select(data => new UserModel()
            {
                userID = data.userID,
                userName = data.userName,
                userMail = data.userMail,
                userPhoto = data.userPhoto,
                userAdmin = (int)data.userAdmin,

            }).SingleOrDefault();

            return kayit;
        }


        [HttpPost]
        [Route("api/useradd")]
        public SonucModel UserAdd(UserModel model)
        {
            if (db.User.Count(s => s.userMail == model.userMail) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu kullanıcı zaten mevcut";
                return sonuc;
            }

            User yeni = new User();
            yeni.userID = Guid.NewGuid().ToString();
            yeni.userMail = model.userMail;
            yeni.userName = model.userName;
            yeni.userPassword = model.userPassword;
            yeni.userPhoto = model.userPhoto;
            yeni.userAdmin = model.userAdmin;
            db.User.Add(yeni);
            try
            {
                // Your code...
                // Could also be before try if you know the exception occurs in SaveChanges

                db.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
            sonuc.islem = true;
            sonuc.mesaj = "Kullanıcı Eklendi";
            return sonuc;
        }

        [HttpPost]
        [Route("api/useredit")]
        public SonucModel UserEdit(UserModel model)
        {
            User kayit = db.User.Where(s => s.userID == model.userID).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanıcı Bulunamadı!";
                return sonuc;
            }

            kayit.userAdmin = model.userAdmin;
            kayit.userMail = model.userMail;
            kayit.userName = model.userName;
            kayit.userPassword = model.userPassword;
            //kayit.userPhoto = model.userPhoto;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kullanıcı Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/userdelete/{userID}")]
        public SonucModel UserDelete(string userID)
        {
            User kayit = db.User.Where(s => s.userID == userID).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanıcı Bulunamadı!";
                return sonuc;
            }

            

            db.User.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kullanıcı Silindi";
            return sonuc;
        }
        #endregion


        #region Data
        [HttpGet]
        [Route("api/datalist")]
        public List<DataModel> DataList()
        {
            List<DataModel> list = db.Data.Select(data => new DataModel()
            {
                dataID = data.dataID,
                dataTitle = data.dataTitle,
                dataDesc = data.dataDesc,
                dataCategory = data.dataCategory,
                dataImgUrl = data.dataImgUrl,
                dataCreatorID = data.dataCreatorID,
                dataLikeCount = data.dataLikeCount,
                dataCommentCount = data.dataCommentCount,
                dataLikes = data.dataLikes,
                dataComments = data.dataComments,
                dataCreateDate = data.dataCreateDate,
                dataCreatorName = data.dataCreatorName
            }).ToList();

            return list;
        }

        [HttpGet]
        [Route("api/databyid/{dataID}")]
        public DataModel DataByID(string dataID)
        {
            DataModel kayit = db.Data.Where(s => s.dataID == dataID).Select(data => new DataModel()
            {
                dataID = data.dataID,
                dataTitle = data.dataTitle,
                dataDesc = data.dataDesc,
                dataCategory = data.dataCategory,
                dataImgUrl = data.dataImgUrl,
                dataCreatorID = data.dataCreatorID,
                dataLikeCount = data.dataLikeCount,
                dataCommentCount = data.dataCommentCount,
                dataLikes = data.dataLikes,
                dataComments = data.dataComments,
                dataCreateDate = data.dataCreateDate,
                dataCreatorName = data.dataCreatorName
        }).SingleOrDefault();

            return kayit;
        }


        [HttpPost]
        [Route("api/dataadd")]
        public SonucModel DataAdd(DataModel model)
        {
         

            Data yeni = new Data();
            yeni.dataID = Guid.NewGuid().ToString();
            yeni.dataTitle = model.dataTitle;
            yeni.dataDesc = model.dataDesc;
            yeni.dataCategory = model.dataCategory;
            yeni.dataImgUrl = model.dataImgUrl;
            yeni.dataCreatorID = model.dataCreatorID;
            yeni.dataLikeCount = model.dataLikeCount;
            yeni.dataCommentCount = model.dataCommentCount;
            yeni.dataLikes = model.dataLikes;
            yeni.dataComments = model.dataComments;
            yeni.dataCreateDate = model.dataCreateDate;
            yeni.dataCreatorName = model.dataCreatorName;
            db.Data.Add(yeni);
            try
            {
                // Your code...
                // Could also be before try if you know the exception occurs in SaveChanges

                db.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
            sonuc.islem = true;
            sonuc.mesaj = "Gönderi Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/dataedit")]
        public SonucModel DataEdit(DataModel model)
        {
            Data kayit = db.Data.Where(s => s.dataID == model.dataID).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Gönderi Bulunamadı!";
                return sonuc;
            }

            kayit.dataTitle = model.dataTitle;
            kayit.dataDesc = model.dataDesc;
            kayit.dataCategory = model.dataCategory;
            kayit.dataImgUrl = model.dataImgUrl;
            kayit.dataCreatorID = model.dataCreatorID;
            kayit.dataLikeCount = model.dataLikeCount;
            kayit.dataCommentCount = model.dataCommentCount;
            kayit.dataLikes = model.dataLikes;
            kayit.dataComments = model.dataComments;
            kayit.dataCreateDate = model.dataCreateDate;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Gönderi Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/datadelete/{dataID}")]
        public SonucModel DataDelete(string dataID)
        {
            Data kayit = db.Data.Where(s => s.dataID == dataID).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Gönderi Bulunamadı!";
                return sonuc;
            }



            db.Data.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Gönderi Silindi";
            return sonuc;
        }
        #endregion




        #region Comment
        [HttpGet]
        [Route("api/commentlist")]
        public List<CommentModel> CommentList()
        {
            List<CommentModel> list = db.Comment.Select(data => new CommentModel()
            {
                commentID = data.commentID,
                comment1 = data.comment1,
                commentPostID = data.commentPostID,
                commentDate = data.commentDate,
                commentCreatorID = data.commentCreatorID

            }).ToList();

            return list;
        }

        [HttpGet]
        [Route("api/commentbyid/{commentID}")]
        public CommentModel CommentByID(string commentID)
        {
            CommentModel kayit = db.Comment.Where(s => s.commentID == commentID).Select(data => new CommentModel()
            {
                commentID = data.commentID,
                comment1 = data.comment1,
                commentPostID = data.commentPostID,
                commentDate = data.commentDate,
                commentCreatorID = data.commentCreatorID
            }).SingleOrDefault();

            return kayit;
        }


        [HttpPost]
        [Route("api/commentadd")]
        public SonucModel CommentAdd(CommentModel model)
        {


            Comment yeni = new Comment();
            yeni.commentID = Guid.NewGuid().ToString();
            yeni.comment1 = model.comment1;
            yeni.commentPostID = model.commentPostID;
            yeni.commentDate = model.commentDate;
            yeni.commentCreatorID = model.commentCreatorID;
         
            db.Comment.Add(yeni);
            try
            {
                // Your code...
                // Could also be before try if you know the exception occurs in SaveChanges

                db.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
            sonuc.islem = true;
            sonuc.mesaj = "Yorum Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/commentedit")]
        public SonucModel CommentEdit(CommentModel model)
        {
            Comment kayit = db.Comment.Where(s => s.commentID == model.commentID).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yorum Bulunamadı!";
                return sonuc;
            }

            kayit.comment1 = model.comment1;
            kayit.commentPostID = model.commentPostID;
            kayit.commentDate = model.commentDate;
            kayit.commentCreatorID = model.commentCreatorID;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/commentdelete/{commentID}")]
        public SonucModel CommentDelete(string commentID)
        {
            Comment kayit = db.Comment.Where(s => s.commentID == commentID).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yorum Bulunamadı!";
                return sonuc;
            }



            db.Comment.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yorum Silindi";
            return sonuc;
        }
        #endregion
    }



}
