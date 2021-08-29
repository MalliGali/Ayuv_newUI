import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import patientDetails from '../../../../assets/nhs_patient'

@Component({
  selector: 'app-patient-video-message',
  templateUrl: './patient-video-message.component.html',
  styleUrls: ['./patient-video-message.component.sass']
})
export class PatientVideoMessageComponent implements OnInit {

  public testPatient: boolean = false;
  public nhsNo: string;
  public dob: string;
  searchedData: any = [];
  constructor(private http: HttpClient, private router: Router) {
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

  public searchData() {
    let index = patientDetails.findIndex(person => person.nhs_no === this.nhsNo && person.dob === this.dateAsYYYYMMDDHHNNSS(new Date(this.dob)));
    console.log(index);
    if (index != -1) {
      localStorage.setItem('NHSno', patientDetails[index].nhs_no);
      this.router.navigate(['/patientVideoMessage/compose']);
    } else {
      Swal.fire('No User Found!')
    }
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
