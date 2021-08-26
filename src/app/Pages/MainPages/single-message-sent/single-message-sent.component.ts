import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnowmedService } from 'src/app/services/snowmed.service';


@Component({
  selector: 'app-single-message-sent',
  templateUrl: './single-message-sent.component.html',
  styleUrls: ['./single-message-sent.component.sass']
})
export class SingleMessageSentComponent implements OnInit {
  user: any;
  userRole: any;
  nhsNo: any;
  dob: any;
  nhsData: any;
  snowmedCode: any = [];
  searchedData: any = [];
  searchDataGet: any = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private snoemedService: SnowmedService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    // if (browserRefresh === true) {
    //   localStorage.clear();
    //   sessionStorage.removeItem('username');
    //   this.router.navigate(['login']);
    // } else if (JSON.parse(localStorage.getItem('user')).username === null) {
    //   localStorage.clear();
    //   sessionStorage.removeItem('username');
    //   this.router.navigate(['login']);
    // } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userRole = this.user.authorities[0].authority;
    // }
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
