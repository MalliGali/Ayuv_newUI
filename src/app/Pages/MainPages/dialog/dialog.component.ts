import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.html'],
})
export class DialogComponent implements OnInit{
  forgotPasswordForm: FormGroup;  
  email: string;
  submitted = false;

    constructor(public modal: NgbActiveModal, private userService: UserService,private fb: FormBuilder) {
      this.forgotPasswordForm = this.fb.group({
        email: ['', Validators.required],
       // password: ['', Validators.required],
        // role: ['4', Validators.required],
      });
    }

  ngOnInit() {
  }

  forgotPassword() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.userService.forgotPassword(this.email)
      .subscribe((res) => { 
          this.modal.close();
      }, err => {
        this.modal.close();
      });
  }





}
