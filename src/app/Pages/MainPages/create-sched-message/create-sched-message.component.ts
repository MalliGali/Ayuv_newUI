import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { ScheduleMessageService } from 'src/app/services/schduleMessage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-sched-message',
  templateUrl: './create-sched-message.component.html',
  styleUrls: ['./create-sched-message.component.sass']
})
export class CreateSchedMessageComponent implements OnInit {
  futureDate: any;
  browserRefresh: any;
  msgForm: FormGroup;
  isLoggedIn = false;
  msgs = [];
  msgs1 = [];
  items = [{ id: 1 }];
  limitTimes = [];
  array = [];
  submitted = false;
  username: any;
  dateScOne: any;
  limitTime: string;
  repeatedTime: any;
  maxNumberOfCharacters = 612;
  numberOfCharacters2 = 0;
  counter = true;
  remainingCharLeft: number = 0;
  interaction = {
    textValue: ''
  };
  days: boolean = false;
  weeks: boolean = false;
  months: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sechduleService: ScheduleMessageService,
    ) {

    this.msgs = [
      { id: '1'}, { id: '2'}, { id: '3'}, { id: '4'}, { id: '5'}, { id: '6'}, { id: '7'},
      { id: '8'}, { id: '9'}, { id: '10'}, { id: '11'}, { id: '12'}, { id: '13'}, { id: '14'},
      { id: '15'}, { id: '16'}, { id: '17'}, { id: '18'}, { id: '19'}, { id: '20'},
      { id: '21'}, { id: '22'}, { id: '23'}, { id: '24'}, { id: '25'}, { id: '26'}, { id: '27'}, { id: '28'},
      { id: '29'}, { id: '30'},
    ];
    this.msgs1 = [
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
      "mtshTitle" : ['', Validators.required],
      "mtshMsg" : this.fb.array([this.newMsg()]),
      "mtshCreatedBy": [''],
      "mtshSqid": [''],
      "mtshId": [''],
      "mtshMsgCount": [1, Validators.required],
      "mtshFreq": ['', Validators.required],
      "mtshFreqPeriod": ['', Validators.required],
      "mtshLog": [''],
      "category": [''],
      "active": [true, Validators.required],
      "gpId": [0],
    });
  }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
      this.username = JSON.parse(localStorage.getItem('user')).username;
  }
  mtshMsg(): FormArray {
    return this.msgForm.get('mtshMsg') as FormArray;
  }
  newMsg(): FormGroup {
    return this.fb.group({
      mstshMsg: new FormControl(''),
      mtshMsgTime: new FormControl('')
    });
  }

  get f() { return this.msgForm.controls; }

  selectChangeHandler(event: any) {
    this.items = [];
    const control = <FormArray>this.msgForm.controls['mtshMsg'];
        for(let i = control.length-1; i >= 0; i--) {
            control.removeAt(i)
    }
    let value = parseInt(event.target.value);
    for (let i = 0; i < value; i++) {
      let tempObj = {id: i};
      this.mtshMsg().push(this.newMsg());
      this.items.push(tempObj);
    }
    this.msgForm.patchValue({mtshMsgCount: event.target.value});
  }

  createAyuvScheduleMsg() {
    this.submitted = true;
    if (this.msgForm.invalid) {
        return;
    }
    return this.sechduleService.CreateMsg(this.msgForm.value).subscribe(
      (res) => {
        Swal.fire({
          heightAuto: false,
          title: 'Success',
          text: 'Created Schedule Message Template Successfully',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['scheduleMessage']);
        })
      },
      (err) => {
        Swal.fire({
          heightAuto: false,
          title: `Error code ${err.status}`,
          text: `${err.error.message}`,
          icon: 'error',
        }).then(() => {
          this.router.navigate(['scheduleMessage']);
        })
      }
    );
  }


  selectChangeHandler1(event){
    let enteredData = Number(event.target.value)
    let evenMonth = 30;
    let oddMonth = 31;
    let controlArray = <FormArray>this.msgForm.controls['mtshMsg'];
    const cr = new Date();
    if(this.days === true) {
      this.months = false;
      this.weeks = false;
      for (let i = 0; i < this.repeatedTime; i++) {
        cr.setMonth(cr.getMonth());
        controlArray.controls[i].patchValue({ mtshMsgTime: new Date(cr).toISOString().slice(0, -8) });
        document.getElementById(`time_${i}`).innerHTML = cr.getDate()+ ' ' + cr.toLocaleString('default', { month: 'long' }) + ' ' + cr.getFullYear();
        cr.setDate(cr.getDate() + (1 * enteredData));
      }
    } else if(this.months === true) {
      this.days = false;
      this.weeks = false;
      for (let i = 0; i < this.repeatedTime; i++) {
        cr.setMonth(cr.getMonth());
        controlArray.controls[i].patchValue({ mtshMsgTime: new Date(cr).toISOString().slice(0, -8) });
        document.getElementById(`time_${i}`).innerHTML = cr.getDate()+ ' ' + cr.toLocaleString('default', { month: 'long' }) + ' ' + cr.getFullYear();
        cr.setMonth(cr.getMonth() + ( 1 * enteredData ));
      }
    } else if(this.weeks === true) {
      this.days = false;
      this.months = false;
      for (let i = 0; i < this.repeatedTime; i++) {
        cr.setMonth(cr.getMonth());
        controlArray.controls[i].patchValue({ mtshMsgTime: new Date(cr).toISOString().slice(0, -8) });
        document.getElementById(`time_${i}`).innerHTML = cr.getDate()+ ' ' + cr.toLocaleString('default', { month: 'long' }) + ' ' + cr.getFullYear();
        cr.setDate(cr.getDate() + (7 * enteredData));
      }
    }

    this.msgForm.patchValue({mtshFreqPeriod: event.target.value});
    this.msgForm.patchValue({'mtshCreatedBy': this.username});
    this.msgForm.patchValue({'mtshCreatedAt': new Date().toISOString()});
  }

  getSelectedLimitTime(event) {
    this.limitTime = event.target.value
    //// console.log(event.target.value);
    if(event.target.value === 'Days') {
      this.days = true;
      this.weeks = false;
      this.months = false;
      this.msgForm.patchValue({mtshFreqPeriod: ''});
      //// console.log(this.days);
    } else if (event.target.value === 'Weeks') {
      this.days = false;
      this.weeks = true;
      this.months = false;
      this.msgForm.patchValue({mtshFreqPeriod: ''});
      //// console.log(this.weeks);
    } else if(event.target.value === 'Months') {
      this.days = false;
      this.weeks = false;
      this.months = true;
      this.msgForm.patchValue({mtshFreqPeriod: ''});
      //// console.log(this.months);
    } else {
      this.days = false;
      this.weeks = false;
      this.months = false;
    }
  }

  getRepeatedTimes(event) {
    // // //// console.log(event.target.value);
    this.repeatedTime = parseInt(event.target.value);
  }
  getRepeatedTimes1(event) {
    // // //// console.log(event.target.value);
    this.repeatedTime = parseInt(event.target.value);
  }

  getText(event, i) {
    let controlArray = <FormArray>this.msgForm.controls['mtshMsg'];
    controlArray.controls[i].patchValue({ mstshMsg: event.target.value });
    // //// console.log(this.msgForm.value);
  }
  onModelChange(textValue: string, i): void {
    this.numberOfCharacters2 = textValue.length;
    if(textValue.length <= 612) {
      // //// console.log(textValue.length, `Less then 612`)
      document.getElementById(i).innerHTML = `${(this.numberOfCharacters2)} total character typed, max <span style="color: #0ca6ee;">612</span>`;
    } else {
      // //// console.log(this.numberOfCharacters2, `Greater then 612`)
      document.getElementById(i).innerHTML = `<span style="color: red;"><i class="far fa-times-circle"></i></span><i> Sorry, your message must be equal to or less
      than <span style="color: #0ca6ee;">612</span> characters(<span style="color: red;">${(this.numberOfCharacters2)}</span>)</i>`;
    }
  }
}
