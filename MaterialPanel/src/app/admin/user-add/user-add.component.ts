import { D } from "@angular/cdk/keycodes";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UserAddComponent implements OnInit {
  formGroup: FormGroup;
  isAdmin = false;
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      mail: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      claim: new FormControl(""),
    });
  }
  addUser() {
    var token = localStorage.getItem("token");
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    var formData = {
      userMail: this.formGroup.value.mail,
      userName: this.formGroup.value.name,
      userPassword: this.formGroup.value.password,
      userPhoto: "foto",
      userAdmin: this.isAdmin ? 1 : 0,
    };
    this.http
      .post(this.apiUrl + "/useradd", formData, { headers: reqHeader })
      .subscribe((res: any) => {
        if (res.islem) {
          this.toastr.success("Kullanıcı başarıyla Eklendi", "");
          this.router.navigate(["/users"]);
        }else{
          this.toastr.error('Bir hata oluştu');
        }
      });
  }
}
