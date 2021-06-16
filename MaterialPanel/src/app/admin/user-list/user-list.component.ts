import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  displayedColumns = ["userAdmin", "userName", "userMail", "Duzenle", "Sil"];
  dataSource: any;
  // selection: SelectionModel<UserData>;
  apiUrl = environment.apiUrl;
  userList: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getList() {
    var token = localStorage.getItem("token");
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    this.http
      .get(this.apiUrl + "/userlist", { headers: reqHeader })
      .subscribe((res) => {
        console.log(res);
        this.userList = res;
        this.dataSource = new MatTableDataSource(this.userList);
      });
  }

  editUser(id) {
    this.router.navigate(["/user_edit", id]);
  }

  deleteUser(id) {
    var token = localStorage.getItem("token");
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    this.http
      .delete(this.apiUrl + "/userdelete/" + id, { headers: reqHeader })
      .subscribe((res: any) => {
        console.log(res);
        if (res.islem) {
          this.toastr.success("Kullanıcı başarıyla silindi", "");
          this.getList();
        }else{
          this.toastr.error('Bir hata oluştu');
        }
      });
  }
}
