import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  hide = true;
  validUser: boolean = false;
  profilePic: string = "assets/images/user.png";
  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submit() {
    if (this.LoginForm.valid) {
      const formValues = this.setUpFormData();
      this.loginService.validateCred(formValues).subscribe((response) => {
        this.validUser = response.body;
        this.login();
      });
    }
  }
  setUpFormData() {
    let formData = {};
    formData['username'] = this.LoginForm.get('username').value;
    formData['password'] = this.LoginForm.get('password').value;

    return formData;
  }

  login() {
    if (this.validUser) {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', this.LoginForm.get('username').value);
      this.router.navigate(['/home']);
    }
  }

}
