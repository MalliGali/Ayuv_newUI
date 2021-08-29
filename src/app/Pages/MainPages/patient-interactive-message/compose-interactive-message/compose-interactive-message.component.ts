import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { MessageService } from 'src/app/services/msg.service';
import Swal from 'sweetalert2';
import patientDetails from '../../../../../assets/nhs_patient';

@Component({
  selector: 'app-compose-interactive-message',
  templateUrl: './compose-interactive-message.component.html',
  styleUrls: ['./compose-interactive-message.component.sass']
})
export class ComposeInteractiveMessageComponent implements OnInit {

  browserRefresh: any;
  public message: string;
  private defMsg: string = 'We are ready to take call. Your Appointment is tomorrow.';
  public mobileNo: string = '';
  public msgTemplate: string = '0';
  // public link: string = '0';
  // public nhsLinks: any = [];
  // private nhsLinksData: any = [];
  // public attachmentFile: any;
  public totalChars: number = 612;
  public remainingChars: number = 612;
  public msgData: any = [];
  public patientName: string;
  public dob: string;
  public nhsNo: string = '';
  private templateId: any = '1';
  searchedData: any = [];
  user: any;
  username: any;
  public acceptResponse: boolean = false;
  // private msgForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private messageService: MessageService, private http: HttpClient) { }

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
      this.onMsgChange(this.message);
      this.getMsgTemplates();
      // this.getNHSLinks();
      this.searchData(localStorage.getItem('NHSno'));
    }
  }

  getMsgTemplates() {
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

  sendSingleMsg() {
    let finalMessage: string = 'Dear ' + this.patientName + ',\n\n' + this.message + '\n\nThanks,\n' + this.username + ',\nGP1.';
    let data: any = {
      messageSms: finalMessage,
      mobileNumber: this.mobileNo,
      NHSNumber: this.nhsNo,
      templateId: this.templateId,
      templateType: 'NEW_MESSAGE'
    };
    this.messageService.sendMsg(data).subscribe(res => {
      console.log(res);
    }, (err) => {
      if (err.status === 200) {
        Swal.fire({
          heightAuto: false,
          title: 'SMS Sent',
          text: 'Video Message Sent to +44 ' + this.mobileNo + ' Successfully',
          icon: 'success',
        }).then((res) => {
          this.router.navigate([`/patientInteraciveMessage`])
        })
      } else {
        Swal.fire({
          heightAuto: false,
          title: 'SMS Sent',
          text: 'Video Message Sent to +44 ' + this.mobileNo + ' Successfully',
          icon: 'success',
        }).then((res) => {
          this.router.navigate([`/patientInteraciveMessage`])
        })
      }

      // //// console.log(err);
    }
    )
  }

  onReset() {
    this.message = this.defMsg;
    // this.link = '0';
    this.msgTemplate = '0';
    this.onMsgChange(this.message);
  }

  onMsgChange(msg: string): void {
    this.remainingChars = this.totalChars - msg.length;
  }

  onTemplateChange(event) {
    this.msgData.forEach(data => {
      if (data.mtsTitle === event) {
        this.message = this.message + '\n\n' + data.mtsMsg;
      }
    });
    this.onMsgChange(this.message);
    // return this.messageService.getMsg().subscribe((data: any) => {
    //   data.map(res => {
    //     if (event === res.mtsTitle) {
    //       this.message = this.defMsg + '\n\n' + res.mtsMsg;
    //     }
    //   })
    //   this.onMsgChange(this.message);
    // })

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

  onGoBack() {
    this.router.navigate(['/patientInteraciveMessage']);
  }

  onNewTemplate() {
    this.router.navigate(['/ineractiveMessage/create']);
  }
}
