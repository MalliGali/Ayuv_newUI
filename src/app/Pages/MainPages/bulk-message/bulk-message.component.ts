import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { BulkMessage } from 'src/app/models/bulkMsg.model';
import { environment } from 'src/app/models/environment';
import { BulkMessageService } from 'src/app/services/bulkMessage.service';
import { InetractiveMessageService } from 'src/app/services/intractiveService';
import { MessageService } from 'src/app/services/msg.service';
import { ScheduleMessageService } from 'src/app/services/schduleMessage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bulk-message',
  templateUrl: './bulk-message.component.html',
  styleUrls: ['./bulk-message.component.sass']
})
export class BulkMessageComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('myButton') myButton: ElementRef;

  message = '';
  isLoading: boolean = false;
  dateValueFormated: any;
  bulkMessageResponse: any = [];
  textBoxSelected: any = false;
  selectedTempID: any;
  textBoxValue: any;
  msgTemplate: any = [];
  selectedNameValue = false;
  selectedTemplateValue = false;
  template = false;
  file = false;
  sFile: any;
  fileSelected = new Blob([''], {type: 'application/csv'});
  csvAttachment: File = null;
  browserRefresh: any;
  uploadForm: FormGroup;
  response: any;
  selectedFile = new Blob([''], {type: 'application/csv'});
  mailArr: any = [];
  mailAvail: any = 0;
  totalForm: any;
  mailUploadStatus: number = null || 0;
  Tooldata = `<h1>Helo</h1>`;
  // displayedColumns: string[] = ['mtshTitle', 'mtshMsg', 'mtshCreatedBy', 'mtshFreq', 'mtshLog', 'actions'];
  displayedColumns = ['date', 'senderName', 'success', 'fail', 'fileName', 'status'];
  fileUploaded: any = false;
  maxNumberOfCharacters = 500;
  numberOfCharacters2 = 0;
  counter = true;
  remainingCharLeft = 0;
  isAwesome: any = false;
  templateFinalValue: any;
  bulkMessageForm: FormGroup;
  interaction = {
    textValue: ''
  };
  fileWithTextbox: boolean = false;
  fileWithTemplate: boolean = false;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  templateName: any;
  constructor(
    private router: Router,
    private msgService: MessageService,
    private intMsgService: InetractiveMessageService,
    private schMsgService: ScheduleMessageService,
    private fb: FormBuilder,
    private blkService: BulkMessageService
  ) { }

  ngOnInit() {
    if (browserRefresh === true) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    } else if (JSON.parse(localStorage.getItem('user')).username === null) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    } else {
      // console.log(this.template);
      this.uploadForm = this.fb.group({
        file: ['']
      });
      this.browserRefresh = browserRefresh;
      // // console.log('refreshed?:', browserRefresh);
      // console.log(this.template);
      this.remainingCharLeft = 500;
      this.bulkMessageForm = this.fb.group({
        messageTypeEnum: [''],
        templateIsActive: [''],
        textBoxMsg: [''],
        templateId: [''],
      });
      this.getData();
    }
  }
  toggleIsAwesome() {
    this.isAwesome = !this.isAwesome;
      // could put additional logic here
    // console.log(this.isAwesome);
    if (this.isAwesome === false) {
      this.template = false;
      // this.textBoxSelected = true;
      this.selectedTemplateValue = false;
      this.selectedNameValue = false;
    }
  }
  selectedTemplate(event) {
    // console.log(event.target.value);
    this.templateFinalValue = event.target.value;
    if (this.selectedTemplateValue === false) {
      this.selectedTemplateValue = true;
    } else {
      this.selectedTemplateValue = true;
    }
    if (event.target.value === `NEW_MESSAGE`) {
      this.templateName = `NEW_MESSAGE`;
      this.msgTemplate = [];
      this.msgService.getMsg().subscribe(res => {
        res.map(data => {
          console.log(data.mtsTitle);
          this.msgTemplate.push(data.mtsTitle);
        });
      });
    } else if (event.target.value === `INTERACTIVE_MSG`) {
      this.templateName = `INTERACTIVE_MSG`;
      this.msgTemplate = [];
      this.intMsgService.getMsg().subscribe(res => {
        res.map(data => {
          console.log(data.mtsIMTitle);
          this.msgTemplate.push(data.mtsIMTitle);
        });
      });
    } else if (event.target.value === `SCHEDULE_MSG`) {
      this.templateName = `SCHEDULE_MSG`;
      this.msgTemplate = [];
      this.schMsgService.getMsg().subscribe(res => {
        res.map(data => {
          // console.log(data.mtshTitle);
          this.msgTemplate.push(data.mtshTitle);
        });
      });
    }
  }
  getFileValue(event) {
    // console.log(event.status.toUpperCase());
    let status = event.status.toUpperCase();
    this.blkService.getByFileName(event.fileId, status).subscribe((data: any) => {
      // console.log(data);
      // data.map((res) => {
      //   console.log(res.templeteMessage)
      //   this.message = data[0].templeteMessage;
      //   console.log(this.message)
      // })
      return this.openDialog(data);
    })
  }
  getDeliverValue(event) {
    // console.log(event.status.toUpperCase());
    let status = event.status.toUpperCase();
    this.blkService.getByFileName(event.fileId, status).subscribe(data => {
      // console.log(data);
      return this.openDialogDlvr(data);
    })
  }

  openDialog(res) {
    // const dialogRef = this.dialog.open(BulkmsgDialogComponent, {
    //   width: '30%',
    //   disableClose: true,
    //   autoFocus: true,
    //   data: res
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getData();
    // });
  }
  openDialogDlvr(res) {
    // const dialogRef = this.dialog.open(BlkmsgdlvrComponent, {
    //   width: '30%',
    //   disableClose: true,
    //   autoFocus: true,
    //   data: res
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getData();
    // });
  }
  selectedName(event) {
    console.log(this.templateName);
    if(this.templateName === `NEW_MESSAGE`){
      this.msgService.getMsg().subscribe(data => {
        data.map(el => {
          if (el.mtsTitle === event.target.value) {
            // console.log(el.mtsTitle, el.mtsID);
            this.selectedTempID =  el.mtsID;
          }
        });
      });
    } else if(this.templateName === `INTERACTIVE_MSG`) {
      this.intMsgService.getMsg().subscribe(data => {
        data.map(el => {
          if (el.mtsIMTitle === event.target.value) {
            // console.log(el.mtsTitle, el.mtsID);
            this.selectedTempID =  el.mtsIMId;
          }
        });
      });
    } else {
      this.schMsgService.getMsg().subscribe(data => {
        data.map(el => {
          if (el.mtshTitle === event.target.value) {
            // console.log(el.mtsTitle, el.mtsID);
            this.selectedTempID =  el.schMsgId;
          }
        });
      });
    }
    
    if (this.selectedNameValue === false) {
      this.selectedNameValue = true;
      if(this.template === true && this.selectedNameValue === true && this.fileUploaded === true) {
        this.fileWithTemplate = true;
      }
    } else {
      this.selectedNameValue = true;
    }
    // console.log(event.target.value);
  }

  onMailAttach(event) {
    if (event.target.files.length > 0) {
      // console.log('file uploaded');
      this.fileUploaded = true;
      if(this.fileUploaded === true && this.textBoxSelected === true) {
        this.fileWithTextbox = true;
        this.remainingCharLeft = this.maxNumberOfCharacters - this.numberOfCharacters2;
      }
       // console.log(event.target.files[0]);
      this.sFile = event.target.files[0];
      this.selectedFile = event.target.files[0];
    }
  }
  async uploadMail() {
    this.isLoading = true;
    // tslint:disable-next-line:prefer-const
    let formData = new FormData();
    formData.append('file', this.sFile);
    if (this.templateFinalValue === undefined) {
      this.bulkMessageForm.patchValue({messageTypeEnum: null});
    } else {
      this.bulkMessageForm.patchValue({messageTypeEnum: this.templateFinalValue});
    }
    this.bulkMessageForm.patchValue({templateIsActive: `${this.isAwesome}`});
    if (this.textBoxValue === undefined) {
      this.bulkMessageForm.patchValue({textBoxMsg: null});
    } else {
      this.bulkMessageForm.patchValue({textBoxMsg: this.textBoxValue});
    }
    if (this.selectedTempID === undefined) {
      this.bulkMessageForm.patchValue({templateId: null});
    } else {
      this.bulkMessageForm.patchValue({templateId: this.selectedTempID});
    }
    console.log(this.bulkMessageForm.value)
    const user_cuur = JSON.parse(localStorage.getItem('users'));
    const username = user_cuur.username;
    const password = user_cuur.password;
    console.log(JSON.stringify(this.bulkMessageForm.value));
    const formValue  = JSON.stringify(this.bulkMessageForm.value);
    formData.append('file', this.sFile);
    formData.append('bulkMessages', formValue);
    // console.log(username, password)
    this.sendData(formData, (e: any) => {
      // console.log(e)
      let JsonE = JSON.parse(e);
      console.log(JsonE);
      if(JsonE.message !== 'File already uploaded') {
        this.fileUpload.nativeElement.value = null;
        this.interaction.textValue = null;
        this.isLoading = false;
        let JsonData: any = JSON.parse(e);
        let convertedDate = this.dateAsYYYYMMDDHHNNSS(new Date(JSON.stringify(JsonData.date)))
        let successMsg = {
          date: JsonData.date,
          success: JsonData.success,
          fail: JsonData.fail,
          total: JsonData.total,
          status: JsonData.status,
          fileName: JsonData.fileName,
          senderName: JsonData.senderName
        }
        this.getData();
        // console.log(successMsg);
      } else {
        Swal.fire({
          heightAuto: false,
          title: 'Error',
          text: 'File already uploaded',
          icon: 'error',
        }).then(() => {
          this.fileUpload.nativeElement.value = null;
          this.isLoading = false;
          this.fileUploaded = false;
          this.interaction.textValue = '';
          this.textBoxSelected = false;
          this.fileWithTextbox = false;
          this.fileWithTemplate = false;
          this.template = false;
          this.getData();
        })
      }
    }
  )
  }
  sendData(formdata, callback) {
    const user_cuur = JSON.parse(localStorage.getItem('users'));
    const username = user_cuur.username;
    const password = user_cuur.password;
    const req = new XMLHttpRequest();
    req.open('POST', `${environment.baseUrl}/sendBulkMessages`, true);
    req.setRequestHeader('Authorization', `Basic ${btoa(username + ':' + password)}`);
    req.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // console.log(`file sent`);
          Swal.fire({
            heightAuto: false,
            title: 'SMS Sent',
            text: 'Bulk Message Sent Successfully',
            icon: 'success',
          }).then(() => {
            callback(req.response);
          })
      } else if(this.status === 400) {
        callback(req.response);
      }
    };
    req.upload.onload = (e) => {
      // console.log(e)
    }
    req.onerror = function() { // only triggers if the request couldn't be made at all
      alert(`Network Error`);
    };
    req.send(formdata);
  }
  dateAsYYYYMMDDHHNNSS(date): string {
    return date.getFullYear()
      + '-' + this.leftpad(date.getMonth() + 1, 2)
      + '-' + this.leftpad(date.getDate(), 2)
      // + ' ' + this.leftpad(date.getHours(), 2)
      // + ':' + this.leftpad(date.getMinutes(), 2)
      // + ':' + this.leftpad(date.getSeconds(), 2);
  }
  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
  onModelChange(textValue: string) {
    // console.log(textValue);
    if(textValue.length > 0) {
      this.textBoxSelected = true;
      console.log(this.fileUploaded, this.textBoxSelected)
      if(this.fileUploaded === true && this.textBoxSelected === true) {
        this.fileWithTextbox = true;
        this.textBoxValue = textValue;
        this.numberOfCharacters2 = textValue.length;
        this.remainingCharLeft = this.maxNumberOfCharacters - this.numberOfCharacters2;
      }
    } else {
      this.textBoxSelected = false;
    }
  }
  
  getTextBoxValue(event) {
    // console.log(this.textBoxValue);
    // console.log(event.target.value);
    // this.textBoxSelected = true;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getData() {
    return this.blkService.getMsg().subscribe((data: any) => {
      // this.dataSource = new MatTableDataSource(data);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    })
  }
}
