import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild,
} from "@angular/animations";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

interface Place {
  imgSrc: string;
  name: string;
  description: string;
  charge: string;
  location: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({transform: 'translateY(-20%)',opacity : 0}),
        animate('500ms ease-in', style({transform: 'translateY(0%)',opacity : 1}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateY(-20%)',opacity : 0}))
      ])
    ])
  ],
})
export class HomeComponent implements OnInit {
  places: Array<Place> = [];
  liked = false;
  apiUrl = environment.apiUrl;
  constructor(
    private http:HttpClient,
    private router:Router
  ) {}
  ngOnInit() {
    this.getPost();
  }
  postLiked() {
    this.liked = !this.liked;
  }

  addComment(test, st) {}

  show: boolean = false;
  Posts : any = [];
getPost(){
  var token = localStorage.getItem('token');
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });

  this.http.get(this.apiUrl+'/datalist',{headers:reqHeader}).subscribe(res=>{
    console.log(res);
    this.Posts = res;
  })
}
  toggle() {
    this.show = !this.show;
  }
  leaveEditMode() {}

  editPost(id){
    this.router.navigate(['/edit_post/',id])
  }
  deletePost(id){
    var token = localStorage.getItem('token');
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    this.http.delete(this.apiUrl+'/datadelete/'+id,{headers:reqHeader}).subscribe((res:any)=>{
      if(res.islem){
        this.getPost();
      }
    })
  }
  }
