import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  userID: string;
  formGroup: FormGroup;
  isAdmin = false;
  apiUrl = environment.apiUrl;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      console.log(res);
      if (res.id) {
        this.userID = res.id;
        this.getUser();
        this.loadForm();
      }
    });
  }

  loadForm() {
    this.formGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      mail: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      claim: new FormControl(""),
    });
  }
  getUser() {
    var token = localStorage.getItem("token");
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    this.http
      .get(this.apiUrl + "/userbyid/" + this.userID, { headers: reqHeader })
      .subscribe((res: any) => {
        this.formGroup.patchValue({
          name: res.userName,
          mail: res.userMail,
        });
        console.log(res);
        if (res.userAdmin == 1) {
          this.isAdmin = true;
        }
      });
  }

  editUser() {
    var token = localStorage.getItem("token");
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    var formData = {
      userID: this.userID,
      userMail: this.formGroup.value.mail,
      userName: this.formGroup.value.name,
      userPassword: this.formGroup.value.password,
      userAdmin: this.isAdmin ? 1 : 0,
    };
    console.log(formData);
    this.http
      .post(this.apiUrl + "/useredit", formData, { headers: reqHeader })
      .subscribe((res: any) => {
        if (res.islem) {
          this.toastr.success("Kullanıcı başarıyla güncellendi", "");
          this.router.navigate(["/users"]);
        }else{
          this.toastr.error('Bir hata oluştu');
        }
      });
  }
}
