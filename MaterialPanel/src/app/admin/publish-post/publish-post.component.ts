import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.scss']
})
export class PublishPostComponent implements OnInit {
  formGroup:FormGroup;
  apiUrl = environment.apiUrl;
  constructor(
    private http:HttpClient,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      claim: new FormControl(''),
    });
  }

  Publish(){
    var tarih = new Date();
    var user:any = JSON.parse(localStorage.getItem('user'));
  
    var Post = {
      dataCreateDate : tarih.getTime(),
      dataLikeCount : 0,
      dataCommentCount: 0 ,
      dataCreatorID: user.uyeId,
      dataDesc : this.formGroup.value.desc,
      dataTitle : this.formGroup.value.title,
      dataCreatorName : user.uyeKadi,
      dataLikes : 'test',
      dataComments : 'test',
      dataCategory : 'Test',
    }
    console.log(Post);
    var token = localStorage.getItem('token');
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });

    this.http.post(this.apiUrl+ '/dataadd',Post,{headers:reqHeader}).subscribe((res:any)=>{
      console.log(res);
      if(res.islem){
        this.toastr.success('Gönderi Paylaşıldı.')
        this.router.navigate(['/dashboard']);
      }else{
        this.toastr.error('Bir hata oluştu');
      }
    })
  }

}