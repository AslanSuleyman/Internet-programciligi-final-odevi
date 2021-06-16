using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.ViewModel
{
    public class DataModel
    {
        public string dataID { get; set; }
        public string dataTitle { get; set; }
        public string dataDesc { get; set; }
        public string dataCategory { get; set; }
        public string dataImgUrl { get; set; }
        public string dataCreatorID { get; set; }
        public int dataLikeCount { get; set; }
        public int dataCommentCount { get; set; }
        public string dataLikes { get; set; }
        public string dataComments { get; set; }
        public int dataCreateDate { get; set; }
        public string dataCreatorName { get; set; }

    }
}