import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { environment } from 'src/app/models/environment';
import { InteractiveMessage } from 'src/app/models/intractiveMessage.model';
import { InetractiveMessageService } from 'src/app/services/intractiveService';
import { MessageService } from 'src/app/services/msg.service';
import { SnowmedService } from 'src/app/services/snowmed.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-int-message',
  templateUrl: './edit-int-message.component.html',
  styleUrls: ['./edit-int-message.component.sass']
})
export class EditIntMessageComponent implements OnInit {
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
  currentEditId: any;
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
    private routeActv: ActivatedRoute,
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
      "mtsIMSQID": [null],
      "mtsIMCreatedBy": [''],
      "mtsIMCreatedAt": [''],
      "mtsIMLog": [''],
      "mtsIMState": [null],
      "mtsIMFrom": [''],
      "mtsIMTo": [''],
      "templetId": [null],
      'smcId': [null, Validators.required],
      "mtsCategory": ['', Validators.required],
      "gpId": [0]
    });
  }

  ngOnInit() {
      this.routeActv.paramMap.subscribe(params => {
        this.currentEditId = params.get('id');
        this.getMsg(this.currentEditId);
        const empId: any = params.get('id');
        if (empId) {
          this.interactiveService.getMsgOne(empId);
        }
      });
      this.getCategories();
      this.getAllForms();
      this.username = JSON.parse(localStorage.getItem('user')).username;
      this.getSnowmedCode();
  }

  get f() { return this.msgForm.controls; }

  selectChangeHandler(event: any) {
    this.items = [];
    let value = parseInt(event.target.value);
    for (let i = 0; i < value; i++) {
      let tempObj = {id: i};
      this.items.push(tempObj);
    }
  }
  getMsg(id: any) {
    return this.interactiveService.getMsgOne(id).subscribe((res: any) => {
      this.editUser(res);
    })
  }
  editUser(msg: InteractiveMessage) {
    return this.msgForm.patchValue({
      "mtsIMId": msg.mtsIMId,
      "mtsIMTitle": msg.mtsIMTitle,
      "mtsIMMsg": msg.mtsIMMsg,
      "mtsIMSQID": msg.mtsIMSQID,
      "mtsIMCreatedBy": msg.mtsIMCreatedBy,
      "mtsIMCreatedAt": msg.mtsIMCreatedAt,
      "mtsIMLog": msg.mtsIMLog,
      "mtsIMState": msg.mtsIMState,
      "mtsIMFrom": msg.mtsIMFrom,
      "mtsIMTo": msg.mtsIMTo,
      "templetId": msg.templetId,
      'smcId': msg.smcId,
      "mtsCategory": msg.mtsCategory,
      "gpId": msg.gpId
    })
  }

  getCateg() {
    return this.interactiveService.getCategories().subscribe((res) => {
    })
  }
  getAllForms() {
    return this.interactiveService.getForms().subscribe((res: any) => {
      res.map(data => {
        this.msgForm.patchValue({'templetId': data.ayvuInrQnsFormId})
      })
    })
  }
  selectedValue(event) {
    return this.interactiveService.getForms().subscribe((res) => {
      for(let i = 0; i <= 2; i++) {
        if(event.target.value === res[i].inrQnsFormDesc) {
          this.interaction.textValue = res[i].inrQnsFormName;
        }
      }
    })
  }

  getCategories() {
    this.interactiveService.getCategories().subscribe((res) => {
      this.categoryList = [];
      for(let i = 0; i <= 2; i++) {
      this.categoryList.push(res[i])
      }
    })
  }
  selectedCategory(event) {
  }
  getSnowMedCode() {
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => {
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
    this.msgForm.patchValue({'mtsIMCreatedBy': this.username});
    this.msgForm.patchValue({'mtsIMCreatedAt': new Date().toISOString()});
    this.msgForm.patchValue({'mtsIMFrom': this.username});
  }
  selectEvent(item) {
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
  }

  onChangeSearch(val: string) {
  }
  
  onFocused(e){
  }
  onModelChange(textValue: string): void {
    this.numberOfCharacters2 = textValue.length;
    this.remainingCharLeft = textValue.length;
  }
  updateMsg() {
    this.submitted = true;
    Swal.fire({
      heightAuto: false,
      title: 'Are you sure?',
      text: 'Are you sure want to update this Message Template !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it',
      cancelButtonText: 'No, keep it'
      
    }).then((result) => {
      if (result.value === true) {
        return this.interactiveService.UpdateMessage(this.msgForm.value).subscribe(
          (res) => {
            Swal.fire({
              heightAuto: false,
              title: 'Updated',
              text: 'Intractive Message Template Updated Successfully',
              icon: 'success',
            }).then(() => {
              this.router.navigate(['ineractiveMessage']);
            })
          }, (err) => {
            Swal.fire({
              heightAuto: false,
              title: `Error code ${err.status}`,
              text: `Message deletion failed!`,
              icon: 'error',
            }).then(() => {
              this.router.navigate(['ineractiveMessage']);
            })
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          {
            heightAuto: false,
            title: 'Cancelled',
            text: 'Update Cancelled !',
            icon: 'error',
          }
        ).then(() => {
          this.router.navigate(['ineractiveMessage']);
        })
      }
    });
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