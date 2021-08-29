import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-schedule-message',
  templateUrl: './patient-schedule-message.component.html',
  styleUrls: ['./patient-schedule-message.component.sass']
})
export class PatientScheduleMessageComponent implements OnInit {

  public testPatient: boolean = false;
  public nhsNo: string;
  public dob: string;
  searchedData: any = [];

  constructor() { }

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

}
