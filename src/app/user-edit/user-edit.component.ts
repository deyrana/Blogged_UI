import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconModalComponent } from '../icon-modal/icon-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { UserService } from '../user/user.service';
import { AuthService } from '../services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  imgUrl: string;
  name: string;
  email: string;
  dob: string
  UserEditForm: FormGroup;
  pageLoad: boolean;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
    private route: ActivatedRoute, private datepipe: DatePipe, private userService: UserService,
    private authService: AuthService, private _location: Location) { }

  ngOnInit(): void {
    this.pageLoad = false;
    this.headerTitle = "Edit Account";
    this.backdrop = true;
    this.navbarMode = "over";
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.imgUrl = params["image"];
      this.name = params["name"];
      this.email = params["email"];
      this.dob = params["dob"];
    });
    this.UserEditForm = this.formBuilder.group({
      name: [this.name],
      email: [this.email, Validators.email],
      dob: [this.dob]
    });
  }

  openIconDialog() {
    const dialogRef = this.dialog.open(IconModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.imgUrl = result;
      } else {
        this.imgUrl = "assets/images/user.png";
      }
    });
  }

  submit() {
    if (this.UserEditForm.valid) {
      this.pageLoad = true;
      const formValues = this.setUpFormData();
      this.userService.editUserData(formValues).subscribe((response) => {
        console.log(response.body);
        if (response.body) {
          this.pageLoad = false;
          let title: string = "Success";
          let content: string = "Details have been saved successfully!";
          let url: string = null;
          let primeBtn: string = null;
          let secBtn: string = "Ok";
          this.openDialog(title, content, url, primeBtn, secBtn);
        }
      },
        error => {
          this.pageLoad = false;
          let title: string = "Failed";
          let content: string = "Some error occurred";
          let url: string = null;
          let primeBtn: string = null;
          let secBtn: string = "Ok";
          this.openDialog(title, content, url, primeBtn, secBtn);
        })
    }
  }

  setUpFormData() {
    let formData = {};
    let dob: string = this.datepipe.transform(this.UserEditForm.get('dob').value, 'yyyy-MM-dd');
    formData["name"] = this.UserEditForm.get('name').value;
    formData["image"] = this.imgUrl;
    formData["email"] = this.UserEditForm.get('email').value;
    formData["dateOfBirth"] = dob;
    formData["username"] = this.authService.getUser();
    return formData;
  }

  openDialog(title: string, content: string, url: string, primeBtn: string, secBtn: string): void {

    let obj = {};
    obj['title'] = title;
    obj['content'] = content;
    obj['primeBtn'] = primeBtn;
    if (url != null) {
      obj['url'] = url;
    }
    if (secBtn != null) {
      obj['secBtn'] = secBtn;
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  navigateToAccount(){
    this._location.back();
  }

}
