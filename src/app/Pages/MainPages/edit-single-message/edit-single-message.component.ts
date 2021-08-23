import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { environment } from 'src/app/models/environment';
import { Message } from 'src/app/models/msg.model';
import { MessageService } from 'src/app/services/msg.service';
import { SnowmedService } from 'src/app/services/snowmed.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-single-message',
  templateUrl: './edit-single-message.component.html',
  styleUrls: ['./edit-single-message.component.sass']
})
export class EditSingleMessageComponent implements OnInit {
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
  currentEditId: any;
  interaction = {
    textValue: ''
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snoemedService: SnowmedService,
    private routeActv: ActivatedRoute,
    private messageService: MessageService,
  ) { 
    this.msgForm = this.fb.group({
      "mtsID": [""],
      "mtsTitle" : ['', Validators.required],
      "mtsMsg" : ['', Validators.required],
      "mtsCreatedBy": [''],
      "mtsCreatedAt": [''],
      "mtsLog": [''],
      "mtsState": [true],
      "mtsFrom": [''],
      "mtsTo": [''],
      "mtsCategory": ['', Validators.required],
      "smcId": [null, Validators.required],
      "gpId": [0],
      "acceptResponse": [true]
    })
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.username = JSON.parse(localStorage.getItem('user')).username;
    this.getSnowmedCode();
    this.routeActv.paramMap.subscribe(params => {
      this.currentEditId = params.get('id');
      const empId = params.get('id');
      if (empId) {
        this.getData(empId);
      }
    });

  }

  
  get f() { return this.msgForm.controls; }
  onMailAttach(event) {
    if (event.target.files.length > 0) {
      this.sFile = event.target.files[0];
    }
  }
  editSingleMsg(e: Message) {
    return this.msgForm.patchValue({
      "mtsID": e.mtsID,
      "mtsTitle": e.mtsTitle,
      "mtsMsg": e.mtsMsg,
      "mtsCreatedBy": e.mtsCreatedBy,
      "mtsCreatedAt": e.mtsCreatedAt,
      "mtsLog": e.mtsLog,
      "mtsState": e.mtsState,
      "mtsFrom": e.mtsFrom,
      "mtsTo": e.mtsTo,
      "mtsCategory": e.mtsCategory,
      "smcId": e.smcId,
      "gpId": e.gpId,
      "acceptResponse": e.acceptResponse,
    })
  }

  getData(id) {
    return this.messageService.getMsgOne(id).subscribe((data: any) => {
      this.editSingleMsg(data);
    },
    (err) => {
      console.log(err)
    })
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
        return this.messageService.UpdateMessage(this.msgForm.value).subscribe(
          (res) => {
            Swal.fire({
              heightAuto: false,
              title: 'Updated',
              text: 'Single Message Template Updated Successfully',
              icon: 'success',
            }).then(() => {
              this.router.navigate(['singleMessage']);
            })
          }, (err) => {
            Swal.fire({
              heightAuto: false,
              title: `Error code ${err.status}`,
              text: `${err.error.message}`,
              icon: 'error',
            }).then(() => {
              this.router.navigate(['singleMessage']);
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
          this.router.navigate(['singleMessage']);
        })
      }
    });
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
