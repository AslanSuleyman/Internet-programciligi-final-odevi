//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication3.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Comment
    {
        public string commentID { get; set; }
        public string commentPostID { get; set; }
        public string comment1 { get; set; }
        public string commentDate { get; set; }
        public string commentCreatorID { get; set; }
    
        public virtual User User { get; set; }
        public virtual Data Data { get; set; }
    }
}
