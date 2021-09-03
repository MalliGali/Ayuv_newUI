import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  public todayDate: string;
  searchedData: any = [];
  public flag: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.todayDate = new Date().toDateString();
  }

  public testPatientChanged() {
    if (this.testPatient == true) {
      this.nhsNo = "6752926069";
      this.dob = new Date('2020-07-25').toISOString().substr(0, 10);
    } else {
      this.nhsNo = null;
      this.dob = null;
    }
  }

  public searchData() {
    let index = patientDetails.findIndex(person => person.nhs_no === this.nhsNo && person.dob === this.dateAsYYYYMMDDHHNNSS(new Date(this.dob)));
    console.log(index);
    if (index != -1) {
      // localStorage.setItem('NHSno', patientDetails[index].nhs_no);
      // index = 0;
      // this.router.navigateByUrl('/patientSingleMessage/compose');
      // this.router.navigate(['/patientSingleMessage/compose']);
      this.router.navigate([`/patientSingleMessage/compose/${this.nhsNo}`]);
    } else {
      Swal.fire('No User Found!')
    }
  }

  // async searchData() {
  // public searchData() {
  //   // console.log(patientDetails);

  //   // return this.http.get('../../../../assets/nhs_patient.json').subscribe(
  //   //   (res: any) => {
  //   // patientDetails.map(async data => {
  //   patientDetails.map(data => {
  //     if (data.nhs_no === this.nhsNo && data.dob === this.dateAsYYYYMMDDHHNNSS(new Date(this.dob))) {
  //       localStorage.setItem('NHSno', data.nhs_no);
  //       this.flag = true;
  //       // return await this.searchedData.push(data);
  //     }
  //   }
  //     // );
  //     // },
  //     // (err) => {
  //     //   //// console.log(err);
  //     // }
  //   )
  //   if (this.flag) {
  //     this.flag = false;
  //     this.router.navigateByUrl('/patientSingleMessage/compose');
  //   }
  // }

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
