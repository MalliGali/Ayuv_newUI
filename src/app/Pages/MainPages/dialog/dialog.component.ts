import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit{

    public title = null;
    public body = null;
    constructor(public modal: NgbActiveModal) {
    }
  
  ngOnInit() {
  }
}
