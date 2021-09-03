import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/msg.service';
import { ScheduleMessageService } from 'src/app/services/schduleMessage.service';
import { SnowmedService } from 'src/app/services/snowmed.service';
import Swal from 'sweetalert2';
import patientDetails from '../../../../assets/nhs_patient';

@Component({
  selector: 'app-schedule-message-sent',
  templateUrl: './schedule-message-sent.component.html',
  styleUrls: ['./schedule-message-sent.component.sass']
})
export class ScheduleMessageSentComponent implements OnInit {
  user: any;
  userRole: any;
  nhsNo: any;
  dob: any;
  nhsData: any;
  snowmedCode: any = [];
  searchedData: any = [];
  searchDataGet: any = true;
  scheduleForm: FormGroup;
  scheduleFormSend: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  username: any;
  singleMessageData: any[] = [];
  singleMessageResult: any[] = [];
  dataAvail: boolean = false;
  desable: boolean = true;
  previewOn: boolean = false;
  formData: any[] = [];
  dataNull: boolean = false;
  patientName: any;
  phone = "";
  phone1 = "";
  currentEditId: any;
  public message: string;
  private defMsg: string = 'We are ready to take call. Your Appointment is tomorrow.';

  constructor(
    private router: Router,
    private snoemedService: SnowmedService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private sngMsgService: MessageService,
    private msgService: ScheduleMessageService,
    private fb: FormBuilder,
    private routeActv: ActivatedRoute,
  ) {
    this.scheduleFormSend = this.fb.group({
      "firstName": [this.patientName],
      "lastName": [""],
      "phoneNumber": ["", Validators.required],
      "email": [`${this.patientName}@nhs.net`],
      "templateId": [""],
      "templateType": ["SCHEDULE_MSG"],
      "templeteMessages": this.fb.array([this.newFinalMsg()]),
      "templateTitle": [""]
    })

    this.scheduleForm = this.fb.group({
      "mtshMsg" : this.fb.array([this.newMsg()]),
    });

  }

  ngOnInit() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userRole = this.user.authorities[0].authority;
      this.getMsg();
      this.routeActv.paramMap.subscribe(params => {
        this.currentEditId = params.get('id');
        this.searchData(this.currentEditId);
      });
  }
  
  mtshMsg(): FormArray {
    return this.scheduleForm.get('mtshMsg') as FormArray;
  }
  mtshMsgFinal(): FormArray {
    return this.scheduleFormSend.get('templeteMessages') as FormArray;
  }
  newMsg(): FormGroup {
    return this.fb.group({
      mstshMsgTitle: new FormControl('', Validators.required),
      mstshMsg: new FormControl(''),
      mtshMsgTime: new FormControl('', Validators.required)
    });
  }
  newFinalMsg(): FormGroup {
    return this.fb.group({
      templetMessage: new FormControl(''),
      scheduleDate: new FormControl('')
    });
  }

  addMsgSchedule() {
    this.desable = false;
    this.dataNull = true;
    this.mtshMsgFinal().push(this.newFinalMsg());
    return this.mtshMsg().push(this.newMsg());
  }

  removeMsgs(i: number) {
    this.desable = true;
    this.mtshMsgFinal().removeAt(i);
    return this.mtshMsg().removeAt(i);
  }

  onFocusOutEvent(e, i) {
    this.formData = this.scheduleForm.value.mtshMsg;
    let controlArrayFinal = <FormArray>this.scheduleFormSend.controls['templeteMessages'];
    controlArrayFinal.controls[i].patchValue({ scheduleDate: e.target.value });
    console.log(e.target.value)
    return this.desable = true;
  }

  onFocusEvent(e, i) {
    return this.desable = false;
  }

  preview() {
    // console.log(this.scheduleForm.value)
    this.scheduleForm.value.mtshMsg.pop()
    this.scheduleFormSend.value.templeteMessages.pop()
    this.formData = this.scheduleForm.value.mtshMsg;
    return this.previewOn = true;
  }
  getMsg() {
    return this.sngMsgService.getMsg().subscribe((res: any) => {
      res.map(e => {
        if(e.mtsState === true) {
          // console.log(e);
          this.singleMessageData.push(e);
        }
      })
    })
  }

  getMsgSelect(d, i) {
    let controlArray = <FormArray>this.scheduleForm.controls['mtshMsg'];
    let controlArrayFinal = <FormArray>this.scheduleFormSend.controls['templeteMessages'];
    return this.sngMsgService.getMsg().subscribe((res: any) => {
      res.map(e => {
        if(e.mtsState === true) {
          if(d.target.value === e.mtsTitle) {
            console.log(e.mtsMsg)
            controlArray.controls[i].patchValue({ mstshMsg: e.mtsMsg });
            // console.log(i)
            controlArrayFinal.controls[i].patchValue({ templetMessage: e.mtsMsg });
          }
        }
      })
      console.log(this.scheduleFormSend.value);
    })
  }
  selectEvent(item) {
    // do something with selected item
    // //// console.log(item);
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => {
      // this.snowmedData = res;
      for(let i = 0; i < res.length; i++) {
        // //// console.log(res[i]);
        if(item === res[i].snowMedCode) {
          // //// console.log(res[i].smcId);
          // this.snowmedCode.push(res[i].snowMedCode);
        }
      }
    })
  }

  back() {
    this.phone = this.scheduleFormSend.value.phoneNumber;
    this.phone1 = this.scheduleFormSend.value.phoneNumber;
    this.previewOn = false;
  }

  cancel() {
    this.previewOn = false;
    this.desable = true;
    this.scheduleForm.reset();
    this.mtshMsg().controls.length = 1
    this.mtshMsgFinal().controls.length = 1
    this.phone = '';
    this.phone1 = '';
    // for (let i = 0; i <= this.mtshMsg().length; i++) {
    //   return this.mtshMsg().removeAt(i)
    // }
  }

  getSnowMedCode() {
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => {
      // //// console.log(res);
      this.nhsData = res;
    })
  }
  getSnowmedCode() {
    // //// console.log(event.target.value);
    // //// console.log(this.categorySelected);
    this.snoemedService.getSnowmedCodes().subscribe((res: any) => 
      // //// console.log(data);
      res.map(e => {
        // //// console.log(e.snowmedCode);
        let snowOnj = {snowmedCode: e.snowMedCode}
        this.snowmedCode.push(e.snowMedCode);
      })
    );
  }
  async searchData(id) {
    patientDetails.map(data => {
      if (data.nhs_no === id) {
        // //// console.log(data);
        this.searchedData.push(data);
        this.patientName = data.patient_name;
        this.dob = data.dob;
        this.nhsNo = data.nhs_no;
        this.message = this.defMsg;
      }
    }
      // );
      // },
      // (err) => {
      //   //// console.log(err);
      // }
    )

  }
  onModelChange(e: any, i): void {
    // console.log(e.target.value, i)
  }

  getText(event, i) {
    let controlArray = <FormArray>this.scheduleForm.controls['mtshMsg'];
    controlArray.controls[i].patchValue({ mstshMsg: event.target.value });
    // //// console.log(this.msgForm.value);
  }

  phoneChange(e) {
    // console.log(e.target.value)
    this.phone = e.target.value;
    this.phone1 = e.target.value
  }

  phoneChangeUp(e) {
    // console.log(e.target.value)
    this.scheduleFormSend.patchValue({phoneNumber: e.target.value})
    this.phone = e.target.value;
  }

  dateAsYYYYMMDDHHNNSS(date): string {
    return this.leftpad(date.getDate(), 2)
      + '/' + this.leftpad(date.getMonth() + 1, 2)
      + '/' + date.getFullYear()
      // + ' ' + this.leftpad(date.getHours(), 2)
      // + ':' + this.leftpad(date.getMinutes(), 2)
      // + ':' + this.leftpad(date.getSeconds(), 2);
  }
  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
  onChangeSearch(event) {
    //// console.log(event)
  }
  onFocused(event) {
    //// console.log(event)
  }
  openSnackBar(message: string, action: string) {
    // this.config = duration ? Object.assign(this.config, { 'duration': duration }) : this.config;
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1500
    });
  }
  sendMsg() {
    this.scheduleFormSend.patchValue({phoneNumber: this.phone || this.phone1})
    this.scheduleFormSend.patchValue({templateTitle: `Smoking`})
    return this.msgService.sendMsg(this.scheduleFormSend.value).subscribe(
      (res) => {
        // //// console.log(res);
        Swal.fire({
          heightAuto: false,
          title: `Success`,
          text: `Schedule Messsage Sent Successfully`,
          icon: 'success',
        }).then(() => {
          this.router.navigate(['patientScheduleMessage']);
        })
      },
      (err) => {
        //// console.log(err);
      }
    )

  }
}
