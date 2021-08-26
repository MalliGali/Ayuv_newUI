import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import patientDetails from '../../../../assets/nhs_patient'

@Component({
  selector: 'app-patient-single-message',
  templateUrl: './patient-single-message.component.html',
  styleUrls: ['./patient-single-message.component.sass']
})
export class PatientSingleMessageComponent implements OnInit {

  public testPatient: boolean = false;
  public nhsNo: string;
  public dob: string;
  searchedData: any = [];
  constructor(private http: HttpClient, private router: Router,) {
  }

  ngOnInit() {
  }

  public testPatientChanged() {
    if (this.testPatient == true) {
      this.nhsNo = "6752926069";
      this.dob = new Date('2020-07-25').toISOString().substr(0, 10);;
    } else {
      this.nhsNo = null;
      this.dob = null;
    }
  }

  async searchData() {
    // console.log(patientDetails);

    // return this.http.get('../../../../assets/nhs_patient.json').subscribe(
    //   (res: any) => {
    patientDetails.map(async data => {
      if (data.nhs_no === this.nhsNo && data.dob === this.dateAsYYYYMMDDHHNNSS(new Date(this.dob))) {
        this.router.navigate([`patientSingleMessage/compose`]);
        localStorage.setItem('NHSno', data.nhs_no);
        // return await this.searchedData.push(data);
      }
    }
      // );
      // },
      // (err) => {
      //   //// console.log(err);
      // }
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
}
