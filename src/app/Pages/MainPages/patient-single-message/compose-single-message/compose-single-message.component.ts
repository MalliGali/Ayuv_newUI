import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MessageService } from 'src/app/services/msg.service';
import patientDetails from '../../../../../assets/nhs_patient';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-compose-single-message',
  templateUrl: './compose-single-message.component.html',
  styleUrls: ['./compose-single-message.component.sass']
})
export class ComposeSingleMessageComponent implements OnInit {
  browserRefresh: any;
  public message: string;
  private defMsg: string = 'We are ready to take call. Your Appointment is tomorrow.';
  public mobileNo: string = '';
  public msgTemplate: string = '0';
  public link: string = '0';
  public attachmentFile: any;
  public totalChars: number = 612;
  public remainingChars: number = 612;
  public msgData: any = [];
  public patientName: string;
  public dob: string;
  private nhsNo: string = '6752926069';
  private templateId: any = '1';
  searchedData: any = [];
  user: any;
  username: any;
  private msgForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private messageService: MessageService, private http: HttpClient) { }

  ngOnInit() {
    this.msgForm = this.formBuilder.group({
      "mobileNumber": ['', Validators.required],
      "messageSms": ['', Validators.required],
      "nhsNumber": [''],
      "templateId": [''],
    })
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
      this.getMsg();
      this.searchData(localStorage.getItem('NHSno'));
    }
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

  onMailAttach(event) {
    if (event.target.files.length > 0) {
      this.attachmentFile = event.target.files[0];
    }
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
          this.router.navigate([`/patientSingleMessage`])
        })
      } else {
        Swal.fire({
          heightAuto: false,
          title: 'SMS Sent',
          text: 'Video Message Sent to +44 ' + this.mobileNo + ' Successfully',
          icon: 'success',
        }).then((res) => {
          this.router.navigate([`/patientSingleMessage`])
        })
      }

      // //// console.log(err);
    }
    )
  }

  onLinkChange() {
    this.message = this.message + '\n\n' + this.link;
    this.onMsgChange(this.message);
  }

  onReset() {
    this.message = this.defMsg;
    this.link = '0';
    this.msgTemplate = '0';
    this.onMsgChange(this.message);
  }

  onMsgChange(msg: string): void {
    this.remainingChars = this.totalChars - msg.length;
  }

  onTemplateChange(event) {
    return this.messageService.getMsg().subscribe((data: any) => {
      data.map(res => {
        if (event === res.mtsTitle) {
          this.message = this.defMsg + '\n\n' + res.mtsMsg;
        }
      })
      this.onMsgChange(this.message);
    })
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
    this.router.navigate(['/patientSingleMessage']);
  }

  onNewTemplate() {
    this.router.navigate(['/singleMessage/create']);
  }
}
