import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import patientDetails from '../../../../assets/nhs_patient'

@Component({
  selector: 'app-patient-interactive-message',
  templateUrl: './patient-interactive-message.component.html',
  styleUrls: ['./patient-interactive-message.component.sass']
})
export class PatientInteractiveMessageComponent implements OnInit {

  public testPatient: boolean = false;
  public nhsNo: string;
  public dob: string;
  searchedData: any = [];

  constructor(private router: Router) { }

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
      this.router.navigate(['/patientInteractiveMessage/compose']);
    } else {
      Swal.fire('No User Found!')
    }
  }
  // async searchData() {

  //   patientDetails.map(async data => {
  //     if (data.nhs_no === this.nhsNo && data.dob === this.dateAsYYYYMMDDHHNNSS(new Date(this.dob))) {
  //       localStorage.setItem('NHSno', data.nhs_no);
  //       this.router.navigateByUrl('/patientInteractiveMessage/compose');
  //     }
  //   })
  // }
  dateAsYYYYMMDDHHNNSS(date): string {
    return this.leftpad(date.getDate(), 2)
      + '/' + this.leftpad(date.getMonth() + 1, 2)
      + '/' + date.getFullYear()
  }
  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
}
