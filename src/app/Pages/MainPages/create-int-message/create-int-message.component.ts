import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InetractiveMessageService } from 'src/app/services/intractiveService';
import { SnowmedService } from 'src/app/services/snowmed.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-int-message',
  templateUrl: './create-int-message.component.html',
  styleUrls: ['./create-int-message.component.sass']
})
export class CreateIntMessageComponent implements OnInit {
  getDescription: boolean = false;
  browserRefresh: any;
  msgForm: FormGroup;
  isLoggedIn = false;
  msgs = [];
  items = [{ id: 1 }];
  limitTimes = [];
  array = [];
  submitted = false;
  username: any;
  forms: [];
  // msgDesc: any;
  categoryList = [];
  snowmedData: any;
  keywordCode = 'snowmedCode';
  keywordDesc = 'snowMedCodeDescription';
  snowmedCode: any = [];
  snowmedDesc: any = [];
  maxNumberOfCharacters = 612;
  numberOfCharacters2 = 0;
  counter = true;
  remainingCharLeft: number = 0;
  interaction = {
    textValue: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private interactiveService: InetractiveMessageService,
    private snoemedService: SnowmedService,
    ) {

    this.msgs = [
      { id: '1'}, { id: '2'}, { id: '3'}, { id: '4'}, { id: '5'}, { id: '6'}, { id: '7'},
      { id: '8'}, { id: '9'}, { id: '10'}, { id: '11'}, { id: '12'}, { id: '13'}, { id: '14'},
      { id: '15'}, { id: '16'}, { id: '17'}, { id: '18'}, { id: '19'}, { id: '20'},
      { id: '21'}, { id: '22'}, { id: '23'}, { id: '24'}, { id: '25'}, { id: '26'}, { id: '27'}, { id: '28'},
      { id: '29'}, { id: '30'},
    ];
    this.limitTimes = [
      { title: 'Days'}, { title: 'Weeks'}, { title: 'Months'}
    ];
    this.msgForm = this.fb.group({
      "mtsIMId": [''],
      "mtsIMTitle": ['', Validators.required],
      "mtsIMMsg": ['', Validators.required],
      "mtsIMSQID": [0],
      "mtsIMCreatedBy": [''],
      "mtsIMCreatedAt": [''],
      "mtsIMLog": [''],
      "mtsIMState": [true, Validators.required],
      "mtsIMFrom": [''],
      "mtsIMTo": [''],
      "templetId": [0],
      "imactive": [true, Validators.required],
      'smcId': [null, Validators.required],
      "mtsCategory": ['', Validators.required],
      "gpId": [0, Validators.required]
    });
  }

  ngOnInit() {
      this.getCategories();
      this.getAllForms();
      this.username = JSON.parse(localStorage.getItem('user')).username;
      // // //// console.log(this.username);
      this.getSnowmedCode();
    // }
  }

  get f() { return this.msgForm.controls; }

  selectChangeHandler(event: any) {
    this.items = [];
    // tslint:disable-next-line: radix
    // tslint:disable-next-line: prefer-const tslint:disable-next-line: radix
    let value = parseInt(event.target.value);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < value; i++) {
      // tslint:disable-next-line: prefer-const
      let tempObj = {id: i};
      this.items.push(tempObj);
    }
    // // //// console.log(this.items);
  }

  createAyuvScheduleMsg() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.msgForm.invalid) {
        return;
    }
    // //// console.log(this.msgForm.value);
    return this.interactiveService.CreateMsg(this.msgForm.value).subscribe(
      (res) => {
        Swal.fire({
          heightAuto: false,
          title: 'Success',
          text: 'Created Intractive Message Template Successfully',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['ineractiveMessage']);
        })
      }, (err) => {
        Swal.fire({
          heightAuto: false,
          title: `Error code ${err.status}`,
          text: `${err.error.message}`,
          icon: 'error',
        }).then(() => {
          this.router.navigate(['ineractiveMessage']);
        })
      }
    )
  }

  getCateg() {
    return this.interactiveService.getCategories().subscribe((res) => {
      // //// console.log(res);
    })
  }
  getAllForms() {
    return this.interactiveService.getForms().subscribe((res: any) => {
      //// console.log(new Date().toISOString());
      res.map(data => {
        this.msgForm.patchValue({'templetId': data.ayvuInrQnsFormId})
      })
    })
  }
  selectedValue(event) {
    //// console.log(event.target.value);
    return this.interactiveService.getForms().subscribe((res) => {
      //// console.log(res);
      for(let i = 0; i <= 2; i++) {
        // // //// console.log(res[i].inrQnsFormDesc);
        if(event.target.value === res[i].inrQnsFormDesc) {
          //// console.log(res[i].inrQnsFormDesc);
          // this.interaction.textValue = res[i].inrQnsFormName;
        }
      }
    })
  }

  getCategories() {
    this.interactiveService.getCategories().subscribe((res) => {
      // // //// console.log(res);
      this.categoryList = [];
      for(let i = 0; i <= 2; i++) {
        // // //// console.log(res[i]);
      this.categoryList.push(res[i])
      }
      // //// console.log(this.categoryList);
    })
  }
  selectedCategory(event) {
    // //// console.log(event.target.value);
  }
  getSnowMedCode() {
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => {
      // //// console.log(res);
      this.snowmedData = res;
    })
  }
  getSnowmedCode() {
    this.snowmedCode = [];
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => 
      res.map(e => {
        //// console.log(res);
        this.snowmedCode.push(e.snowMedCode);
        this.snowmedDesc.push(e.snowMedCodeDescription);
      })
    );
  }
  getSelectedCategory(event) {
    // //// console.log(event.target.value);
    this.msgForm.patchValue({"mtsCategory": event.target.value});
    this.msgForm.patchValue({'mtsIMCreatedBy': this.username});
    this.msgForm.patchValue({'mtsIMCreatedAt': new Date().toISOString()});
    this.msgForm.patchValue({'mtsIMFrom': this.username});
  }
  selectEvent(item) {
    // do something with selected item
    // //// console.log(item);
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => {
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
    // this.msgForm.patchValue({"smcId": Math.round(parseInt(item))});
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
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
    //// console.log(this.getDescription);
  }

}