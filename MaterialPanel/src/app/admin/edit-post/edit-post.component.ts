import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  formGroup:FormGroup;
  apiUrl = environment.apiUrl;
  dataID : string;
  constructor(
    private http:HttpClient,
    private route:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      this.dataID = res.id;
      this.getPost(res.id);
    })
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
    });
  }
  post: any = [];
  getPost(id){
    var token = localStorage.getItem('token');
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    this.http.get(this.apiUrl+'/databyid/'+id,{headers:reqHeader}).subscribe((res:any)=>{
      console.log(res);
      this.post = res;
      this.formGroup.patchValue({
        title:res.dataTitle,
        desc : res.dataDesc
      })
    })
  }
  Edit(){
    var tarih = new Date();
    var user:any = JSON.parse(localStorage.getItem('user'));
  
    var Post = {
      dataCreateDate : tarih.getTime(),
      dataLikeCount : this.post.dataLikeCount,
      dataCommentCount: this.post.dataCommentCount ,
      dataCreatorID: this.post.dataCreatorID,
      dataDesc : this.formGroup.value.desc,
      dataTitle : this.formGroup.value.title,
      dataID : this.post.dataID,
      dataCreatorName : user.uyeKadi,
      dataLikes : this.post.dataLikes,
      dataComments : this.post.dataComments,
      dataCategory : this.post.dataCategory,
    }
    console.log(Post);
    var token = localStorage.getItem('token');
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });

    this.http.put(this.apiUrl+ '/dataedit',Post,{headers:reqHeader}).subscribe((res:any)=>{
      console.log(res);
      if(res.islem){
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
