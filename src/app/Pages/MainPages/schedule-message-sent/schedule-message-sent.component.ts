import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/msg.service';
import { SnowmedService } from 'src/app/services/snowmed.service';


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
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  username: any;
  singleMessageData: any[] = [];
  dataAvail: boolean = false;
  desable: boolean = true;
  previewOn: boolean = false;
  formData: any[] = [];
  dataNull: boolean = false;
  
  constructor(
    private router: Router,
    private snoemedService: SnowmedService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private sngMsgService: MessageService,
    private fb: FormBuilder,
  ) {
    this.scheduleForm = this.fb.group({
      "mtshMsg" : this.fb.array([this.newMsg()]),
    });

  }

  ngOnInit() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userRole = this.user.authorities[0].authority;
      this.getMsg();
      console.log(this.mtshMsg().value[0].mstshMsg === '')
  }
  
  mtshMsg(): FormArray {
    return this.scheduleForm.get('mtshMsg') as FormArray;
  }
  newMsg(): FormGroup {
    return this.fb.group({
      mstshMsg: new FormControl('', Validators.required),
      mtshMsgTime: new FormControl('', Validators.required)
    });
  }

  addMsgSchedule() {
    this.desable = false;
    this.dataNull = true;
    return this.mtshMsg().push(this.newMsg());
  }

  removeMsgs(i: number) {
    this.desable = true;
    return this.mtshMsg().removeAt(i);
  }

  onFocusOutEvent(e, i) {
    return this.desable = true;
  }

  onFocusEvent(e, i) {
    return this.desable = false;
  }

  preview() {
    console.log(this.scheduleForm.value)
    this.scheduleForm.value.mtshMsg.pop()
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
    this.previewOn = false;
  }

  cancel() {
    this.previewOn = false;
    this.desable = true;
    this.mtshMsg().controls.length = 0
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
  async searchData() {
    this.searchDataGet = true;
    //// console.log(this.nhsNo);
    //// console.log(this.dateAsYYYYMMDDHHNNSS(new Date(this.dob)));
    return this.http.get('../../../../assets/nhs_patient.json').subscribe(
      (res: any) => {
        res.map(async data => {
          // // console.log('data')
          if(data.nhs_no === this.nhsNo && data.dob === this.dateAsYYYYMMDDHHNNSS(new Date(this.dob))) {
            console.log(data);
            // this.router.navigate([`msgMSG/sngMsg/${data.nhs_no}`])
            return await this.searchedData.push(data);
          }
        });
      },
      (err) => {
        //// console.log(err);
      }
    )

  }
  onModelChange(e: any, i): void {
    console.log(e.target.value, i)
  }

  getText(event, i) {
    let controlArray = <FormArray>this.scheduleForm.controls['mtshMsg'];
    controlArray.controls[i].patchValue({ mstshMsg: event.target.value });
    // //// console.log(this.msgForm.value);
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
}
