import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MustMatch } from './must-match.validators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
@Component({
  selector: 'app-register-boxed',
  templateUrl: './register-boxed.component.html',
  styleUrls: ['./register-boxed.component.scss']
})
export class RegisterBoxedComponent implements OnInit {
  submitted = false;
  selected = 'Select';
  selected1 = 'Select';
  userForm: FormGroup;
  emailAccepted: boolean;
  gpData: any = [];
  user: any;
  cnfPassword: any = '';
  cnfPasswordValue: boolean;
  isValid: boolean = false;
  isLoading: boolean = false;
  paswordMatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      "userFirstName": ['', Validators.required],
      "userLastName": ['', Validators.required],
      "nhsEmailId": [''],
      "phoneNumber": ['', [Validators.required, Validators.pattern("^((\\+44-?)|0)?[0-9]{10}$")]],
      "practice": [''],
      "gpId": [0],
      "roleId": [3],
      "registrationStatus": ['Approved'],
      "username": ['', Validators.required],
      "password": ['', [Validators.required, Validators.minLength(6)]],
      "active": [true],
      "cnfPassword": ['', Validators.required],
      "verificationCode" : ['']
    },
    {
      validator: MustMatch('password', 'cnfPassword')
    }
    )
    this.gpData = [
      {
        gpId: '1',
        gpName: 'GP_1'
      },
      {
        gpId: '2',
        gpName: 'GP_2'
      },
      {
        gpId: '3',
        gpName: 'GP_3'
      },
      {
        gpId: '4',
        gpName: 'GP_4'
      },
    ]
  }
  validation(event){
    // //// console.log(event)
    let emailValid = this.userForm.get('nhsEmailId');
    let str = event;
    let last = str.split("@").pop();
    // //// console.log(last)
    if(last === 'nhs.net') {
      return emailValid.setErrors(null)
    } else if(last === 'nhs.uk') {
      return emailValid.setErrors(null)
    } else {
      return emailValid.setErrors({'incorrect': true})
    }
  }
  get f() { return this.userForm.controls; }
  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.userForm.get('cnfPassword').touched && this.userForm.invalid;
      return controlInvalid || formInvalid;
    }
  }
  selectedGp(event) {
    //// console.log(event.value);
    this.userForm.patchValue({ "gpId": Number(event.value)});
    this.gpData.map(data => {
      if(data.gpId === event.value) {
        this.userForm.patchValue({ "practice": data.gpName})
      }
    })
    //// console.log(this.userForm.value)
  }
  // selectedRole(event) {
  //   this.userForm.patchValue({ "roleId": Number(event.target.value)})
  //   // //// console.log(Number(event.target.value));
  // }
  onSubmit() {
    console.log("hitting")
    this.submitted = true;
    this.isLoading = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    //  console.log(this.userForm.value);
    this.userService.registerAyuvUser(this.userForm.value).subscribe(
      (res) => {
        if(res) {
          this.isLoading = false;
        }
        Swal.fire({
          heightAuto: false,
          title: `Success`,
          text: `Registration Successfull, Please check your Mail.`,
          icon: 'success',
        }).then(() => {
          this.router.navigate(['login']);
        });
      },
      (err) => {
        Swal.fire({
          heightAuto: false,
          title: `Error`,
          text: `Registration Failed! Please try again.`,
          icon: 'error',
        }).then(() => {
          this.isLoading = false;
          this.router.navigate(['register']);
        });
      }
    )
  }
  matcher = new MyErrorStateMatcher();
}
