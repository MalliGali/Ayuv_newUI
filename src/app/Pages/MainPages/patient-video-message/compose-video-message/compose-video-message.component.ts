import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/msg.service';
import Swal from 'sweetalert2';
import patientDetails from '../../../../../assets/nhs_patient';
import { environment } from 'src/app/models/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-compose-video-message',
  templateUrl: './compose-video-message.component.html',
  styleUrls: ['./compose-video-message.component.sass']
})
export class ComposeVideoMessageComponent implements OnInit {
  browserRefresh: any;
  public message: string;
  private defMsg: string = "I'm ready to start our Video Consult.Click the link below to join and wait for me to connect.";
  public mobileNo: string = '';
  public patientName: string;
  public dob: string;
  public nhsNo: string = '';
  public msgTemplate: string = '0';
  public link: string = '0';
  public attachmentFile: any;
  public totalChars: number = 612;
  public remainingChars: number = 612;
  public msgData: any = [];
  private videochatLinkMessage: string;

  private templateId: any = '0';
  private msgForm: FormGroup;
  searchedData: any = [];
  user: any;
  username: any;
  templateType: any = 'TEXT_BOX_MSG';

  whereBy: any = {
    roomUrl: '',
    startDate: '',
    endDate: '',
    hostRoomUrl: ''
  }

  constructor(private router: Router, private formBuilder: FormBuilder,
    private messageService: MessageService, public sanitizer: DomSanitizer,
    private http: HttpClient) { }

  ngOnInit() {
    // this.msgForm = this.formBuilder.group({
    //   "mobileNumber": ['', Validators.required],
    //   "messageSms": ['', Validators.required],
    //   "nhsNumber": [''],
    //   "templateId": [''],
    // })
    this.browserRefresh = browserRefresh;
    if (browserRefresh === true) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.username = JSON.parse(localStorage.getItem('user')).username;
      this.message = this.defMsg;
      this.searchData(localStorage.getItem('NHSno'));
      // this.nhsNo = localStorage.getItem('NHSno');
      this.onMsgChange(this.message);
      this.getData();
      this.getMsg();
      // this.videochatLink = this.whereBy.roomUrl.changingThisBreaksApplicationSecurity;
      // this.onMsgChange(this.message);
    }
  }

  searchData(id) {
    // //// console.log(this.nhsNo);
    // //// console.log(this.dateAsYYYYMMDDHHNNSS(new Date(this.dob)));
    // return this.http.get('../../../assets/nhs_patient.json').subscribe(
    //   (res: any) => {
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

  onMailAttach(event) {
    if (event.target.files.length > 0) {
      this.attachmentFile = event.target.files[0];
    }
  }

  // onLinkChange() {
  //   this.message = this.message + '\n\n' + this.link;
  //   this.onMsgChange(this.message);
  // }

  // onReset() {
  //   this.message = this.defMsg;
  //   this.link = '0';
  //   this.msgTemplate = '0';
  //   this.onMsgChange(this.message);
  // }

  onMsgChange(msg: string): void {
    this.remainingChars = this.totalChars - msg.length;
  }

  async sendIntractiveMsg() {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const password = user.password;
    let finalMessage: string = 'Dear ' + this.patientName + ',\n\n' + this.message + '\n\nThanks,\n' + this.username + ',\nGP1.';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    const params = new HttpParams()
      .set('mobileNumber', JSON.stringify(this.mobileNo))
      .set('messageSms', finalMessage.trim())
      .set('NHSNumber', this.nhsNo)
      .set('roomUrl', this.whereBy.roomUrl.changingThisBreaksApplicationSecurity)
      .set('templateId', this.templateId)
      .set('templateType', this.templateType);
    return this.http.get(`${environment.baseUrl}/sendVideoMessageTemplateToSMS`, { headers, params }).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        if (err.status === 200) {
          Swal.fire({
            heightAuto: false,
            title: 'SMS Sent',
            text: 'Video Message Sent to +44 ' + this.mobileNo + ' Successfully',
            icon: 'success',
          }).then((res) => {
            this.router.navigate([`/patientVideoMessage`])
          })
        } else {
          Swal.fire({
            heightAuto: false,
            title: 'SMS Sent',
            text: 'Video Message Sent to +44 ' + this.mobileNo + ' Successfully',
            icon: 'success',
          }).then((res) => {
            this.router.navigate([`/patientVideoMessage`])
          })
        }

        // //// console.log(err);
      }
    );
  }

  getRoomUrl(callback) {
    const oReq = new XMLHttpRequest();
    // oReq.addEventListener("load", function() {
    //   //// console.log(JSON.parse(oReq.response))
    // });
    oReq.onreadystatechange = function () {
      callback(oReq.response);
    }
    oReq.open("GET", "https://video.ayuv.co.uk");
    oReq.send();
  }
  async getData() {
    return await this.getRoomUrl((e) => {
      // console.log(Object.length)
      if (e !== '') {
        for (let i = 1; i === 1; i++) {
          this.whereBy = JSON.parse(e);
          for (let j = 0; j < 1; j++) {
            // console.log(this.whereBy)
          }
          this.whereBy.roomUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.whereBy.roomUrl);
          this.message = `I'm ready to start our Video Consult. Click the link below to join and wait for me to connect.\n\nPlease click the link to begain: ${this.whereBy.roomUrl.changingThisBreaksApplicationSecurity}.`;
          this.videochatLinkMessage = this.message;
          this.onMsgChange(this.message);
          //// console.log(this.whereBy.roomUrl.changingThisBreaksApplicationSecurity);
          //// console.log(this.msgForm.value.messageSms.trim())
        }
      }
    })
  }


  onGoBack() {
    this.router.navigate(['/patientVideoMessage']);
  }

  getMsg() {
    return this.messageService.getMsg().subscribe((res: any) => {
      res.map(e => {
        if (e.mtsState === true) {
          // //// console.log(e);
          this.msgData.push(e);
          // this.templateId = e.mtsID;
          // this.templateType = `NEW_MESSAGE`;
          // this.msgForm.patchValue({ templateType: this.templateType })
        }
      })
      // res.map(e => {

      // })
      // this.msgForm.patchValue({'sngMessage': res.})
    })
  }

  onTemplateChange(event) {
    return this.messageService.getMsg().subscribe((data: any) => {
      data.map(res => {
        if (event === res.mtsTitle) {
          this.message = this.videochatLinkMessage + '\n\n' + res.mtsMsg;
        }
      })
      this.onMsgChange(this.message);
    })
  }
}
