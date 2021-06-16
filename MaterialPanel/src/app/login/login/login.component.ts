import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: string;
  email : string;
  constructor(private router: Router,
    private http: HttpClient,
    private cd:ChangeDetectorRef,) { }
  apiUrl = "https://localhost:44339/api";
  ngOnInit() { }
  onLogin() {
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/dashboard']);
  }
  tokenAl() {
   
    var data = "username=" + this.email + "&password=" + this.password + "&grant_type=password";
    console.log(data);
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    this.http.post(this.apiUrl + "/token", data, { headers: reqHeader }).subscribe((res:any)=>{
    
      if(res.access_token){
        console.log('tst')
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('user',JSON.stringify(res));
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
