import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { UserLogin } from 'src/app/models/UserLogin';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styleUrls: ['./login-boxed.component.scss'],
})
export class LoginBoxedComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  username: string;
  password: string;
  successMessage: string;
  userLogin: UserLogin;

  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthService) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        // role: ['4', Validators.required],
      });
    }
  ngOnInit() {
    if (browserRefresh === true) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    }
  }
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.authenticationService(this.f.username.value, this.f.password.value, this.loginForm.value).subscribe(
      (result) => {
        console.log(result)
        localStorage.setItem('users', JSON.stringify(this.loginForm.value))
        localStorage.setItem('quickLogin', 'false');
        this.router.navigate(['/dashboard'])
      }, (err) => {
        if (err.status === 401) {
          Swal.fire({
            heightAuto: false,
            title: `Error`,
            text: `Please Check With Your Credentials`,
            icon: 'error',
          }).then(() => {
            this.router.navigate(['login'])
          })
        }
        console.log(err)
      });
  }
}
