import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fullName: string;
  email: string;
  alias: string;
  formGroup: FormGroup;
  form: FormGroup;
  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  disableSubmit: boolean;
  public readonly countries = ['Minsk', 'Berlin', 'Moscow', 'NYC'];
  public locationValue = 'Berlin';
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirm: new FormControl('', Validators.required),
    });
     this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
    });
    this.form.get('currentPassword').valueChanges
      .subscribe(val => { this.currentPassword = val; });

    this.form.get('newPassword').valueChanges
      .subscribe(val => { this.newPassword = val; });

    this.form.get('newPasswordConfirm').valueChanges
      .subscribe(val => { this.newPasswordConfirm = val; });

    // this.spinnerService.visibility.subscribe((value) => {
    //   this.disableSubmit = value;
    // });
  }

  changePassword(){

  }

  saveProfile(){
    
  }

}
