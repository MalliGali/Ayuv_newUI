import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { environment } from 'src/app/models/environment';
import { SnowmedService } from 'src/app/services/snowmed.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-single-message',
  templateUrl: './create-single-message.component.html',
  styleUrls: ['./create-single-message.component.sass']
})
export class CreateSingleMessageComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  getDescription: boolean = false;
  sFile: any;
  browserRefresh: any;
  isLoggedIn = false;
  submitted = false;
  msgForm: FormGroup;
  username: any;
  snowmedData: any;
  categorySelected: any;
  keywordCode = 'snowmedCode';
  keywordDesc = 'snowMedCodeDescription';
  snowmedCode: any = [];
  snowmedDesc: any = [];
  maxNumberOfCharacters = 612;
  numberOfCharacters2 = 0;
  counter = true;
  remainingCharLeft: number = 0;
  user: any;
  interaction = {
    textValue: ''
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snoemedService: SnowmedService,
  ) { 
    this.msgForm = this.fb.group({
      "mtsTitle" : ["", Validators.required],
      "mtsMsg" : ["", Validators.required],
      "mtsCreatedBy": [""],
      "mtsCreatedAt": [""],
      "mtsLog": [""],
      "mtsState": [true, Validators.required],
      "mtsFrom": [this.username, Validators.required],
      "mtsTo": [""],
      "mtsCategory": ["", Validators.required],
      "smcId": ["", Validators.required],
      "gpId": [1, Validators.required],
      "acceptResponse": [true]
    })
  }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.username = JSON.parse(localStorage.getItem('user')).username;
      this.getSnowmedCode();
  }

  get f() { return this.msgForm.controls; }
  onMailAttach(event) {
    if (event.target.files.length > 0) {
      this.sFile = event.target.files[0];
    }
  }
  async createAyuvMessage() {
    this.submitted = true;
    let formData = new FormData();
    const formValue  = JSON.stringify(this.msgForm.value);
    formData.append('dto', formValue);
    formData.append('image', this.sFile);
    return await this.sendData(formData, (e: any) => {
        this.router.navigate(['/singleMessage']);
      });
  }
  async sendData(formdata, callback) {
    const user_cuur = JSON.parse(localStorage.getItem('users'));
    const username = user_cuur.username;
    const password = user_cuur.password;
    // //// console.log(user_cuur)
    const req = new XMLHttpRequest();
    req.open('POST', `${environment.baseUrl}/createSingleMessageTemplate`, true);
    req.setRequestHeader('Authorization', `Basic ${btoa(username + ':' + password)}`);
    req.onreadystatechange = function() {
      if (this.status === 200) {
          Swal.fire({
            heightAuto: false,
            title: 'Success',
            text: 'New Single Message Created Successfully',
            icon: 'success',
          }).then(() => {
            callback(req.response);
          })
      } else if(this.status === 400) {
        Swal.fire({
          heightAuto: false,
          title: 'Failed',
          text: 'Please try again !',
          icon: 'error',
        }).then(() => {
          callback(req.response);
        })
      }
    };
    return await req.send(formdata);
  }
  
  getSnowMedCode() {
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => {
      // //// console.log(res);
      this.snowmedData = res;
    })
  }
  getSnowmedCode() {
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => 
      res.map(e => {
        let snowOnj = {snowmedCode: e.snowMedCode}
        this.snowmedCode.push(e.snowMedCode);
        this.snowmedDesc.push(e.snowMedCodeDescription);
      })
    );
  }
  getSelectedCategory(event) {
    this.msgForm.patchValue({"mtsCategory": event.target.value});
  }


  selectEvent(item) {
    // console.log(item)
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => {
      // console.log(res)
      for(let i = 0; i < res.length; i++) {
        if(item === res[i].snowMedCode) {
          this.snowmedCode.push(res[i].snowMedCode);
          this.msgForm.patchValue({"smcId": res[i].smcId});
        } else if(item === res[i].snowMedCodeDescription) {
          this.snowmedCode.push(res[i].snowMedCode);
          this.msgForm.patchValue({"smcId": res[i].smcId});
        }
      }
    })
    this.msgForm.patchValue({'mtsCreatedAt': new Date().toISOString()});
    this.msgForm.patchValue({'mtsCreatedBy': this.username});
    this.msgForm.patchValue({'mtsFrom': this.username});
    this.msgForm.patchValue({'mtsLog': this.username});
  }

  onChangeSearch(val: string) {
    
  }
  
  onFocused(e){
   
  }
  onModelChange(textValue: string): void {
    this.numberOfCharacters2 = textValue.length;
    this.remainingCharLeft = textValue.length;
  }
  getBydesc(e) {
    if(this.getDescription !== true) {
      this.getDescription = true;
    } else {
      this.getDescription = false;
    }
  }

}
